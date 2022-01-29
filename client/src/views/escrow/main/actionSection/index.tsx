import React from 'react';
import Button from '../../../../components/button';

type ActionsSectionProps = {
    isExecuting: boolean
    stage: number
    isBuyer: boolean
    isSeller: boolean
    isAgent: boolean
    sendEscrow: () => Promise<void>
    sendPayment: () => Promise<void>
    confirmPayment: () => Promise<void>
    returnEscrowToSeller: () => Promise<void>
    releaseEscrowToBuyer: () => Promise<void>
  }

const ActionsSection = ({
  isExecuting,
  stage,
  isBuyer,
  isSeller,
  isAgent,
  sendEscrow,
  sendPayment,
  confirmPayment,
  returnEscrowToSeller,
  releaseEscrowToBuyer,
} : ActionsSectionProps) => {
  if (!isBuyer && !isSeller && !isAgent) return null;
  if (stage === 3 || stage === 4 || stage === 5) return null;

  const actionOutput = getAction({
    isBuyer,
    isSeller,
    isAgent,
    stage,
    sendPayment,
    sendEscrow,
    confirmPayment,
    returnEscrowToSeller,
    releaseEscrowToBuyer,
  });
  if (actionOutput === null) return null;
  if (isExecuting) return <>Executing...</>;
  return (
    <>
      {actionOutput.map((a) => {
        if (a === null) return null;
        return (
          <Button
            key={a.label}
            type="button"
            onClick={() => a.action()}
          >
            {a.label}
          </Button>
        );
      })}
    </>
  );
};

type getActionInputType = {
  isBuyer: boolean
  isSeller: boolean
  isAgent: boolean
  stage: number
  sendPayment: () => Promise<void>
  sendEscrow: () => Promise<void>
  confirmPayment: () => Promise<void>
  returnEscrowToSeller: () => Promise<void>
  releaseEscrowToBuyer: () => Promise<void>
}

type GetActionOutputType = {
  label: string
  action: () => Promise<void> | null
} | null
const getAction = ({
  isBuyer,
  isSeller,
  isAgent,
  stage,
  sendPayment,
  sendEscrow,
  confirmPayment,
  returnEscrowToSeller,
  releaseEscrowToBuyer,
}: getActionInputType): GetActionOutputType[] | null => {
  if (isBuyer) {
    if (stage === 0) return null;
    if (stage === 1) {
      return [{
        label: 'Send Payment',
        action: sendPayment,
      }];
    }
    if (stage === 2) return null;
  }
  if (isSeller) {
    if (stage === 0) {
      return [{
        label: 'Send Escrow',
        action: sendEscrow,
      }];
    }
    if (stage === 1) return null;
    if (stage === 2) {
      return [{
        label: 'Confirm Payment',
        action: confirmPayment,
      }];
    }
  }
  if (isAgent) {
    if (stage === 0) return null;
    if (stage === 1 || stage === 2) {
      return [{
        label: 'Return escrow to seller',
        action: returnEscrowToSeller,
      }, {
        label: 'Release escrow to buyer',
        action: releaseEscrowToBuyer,
      }];
    }
  }

  throw new Error('Action not defined');
};

export default ActionsSection;
