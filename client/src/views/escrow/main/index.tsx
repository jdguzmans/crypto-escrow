import React, { useContext } from 'react';
import { BigNumber, ethers } from 'ethers';

import escrowAbi from '../../../smartContract/abi.json';

import { EthereumPvoiderContextType, EthereumProviderContext } from '../../../context/ethProvider';
import ActionsSection from './actionSection';
import StageSection from './stageSection';
import AmountSection from './amountSection';
import AddressSection from './addressSection';

import * as config from '../../../config';

import Card from '../../../components/card';

type EscrowMainProps = {
    isExecuting: boolean
    setIsExecuting: Function
    escrowIndex: number
    amount: BigNumber
    stage: number
    buyerAddress: string
    sellerAddress: string
    agentAddress: string
}

const EscrowMain = (props: EscrowMainProps) => {
  const ethereumProviderContext = useContext<EthereumPvoiderContextType>(EthereumProviderContext);
  const { account, web3Provider } = ethereumProviderContext;

  const isBuyer = account === props.buyerAddress;
  const isSeller = account === props.sellerAddress;
  const isAgent = account === props.agentAddress;

  const sendEscrow = async () => {
    if (web3Provider === null) return;
    try {
      props.setIsExecuting(true);

      const signer = web3Provider.getSigner();
      const contract = new ethers.Contract(config.CONTRACT_ADDRESS, escrowAbi, signer);

      await contract.sendEscrow(props.escrowIndex, { value: props.amount });
    } catch (e:any) {
      console.log(e.message);
      props.setIsExecuting(false);
    }
  };

  const sendPayment = async () => {
    if (web3Provider === null) return;
    try {
      props.setIsExecuting(true);

      const signer = web3Provider.getSigner();
      const contract = new ethers.Contract(config.CONTRACT_ADDRESS, escrowAbi, signer);

      await contract.confirmPaymentSent(props.escrowIndex);
    } catch (e:any) {
      console.log(e.message);
      props.setIsExecuting(false);
    }
  };

  const confirmPayment = async () => {
    if (web3Provider === null) return;
    try {
      props.setIsExecuting(true);

      const signer = web3Provider.getSigner();
      const contract = new ethers.Contract(config.CONTRACT_ADDRESS, escrowAbi, signer);

      await contract.confirmPaymentReceived(props.escrowIndex);
      props.setIsExecuting(false);
    } catch (e:any) {
      console.log(e.message);
      props.setIsExecuting(false);
    }
  };

  const returnEscrowToSeller = async () => {
    if (web3Provider === null) return;
    try {
      props.setIsExecuting(true);

      const signer = web3Provider.getSigner();
      const contract = new ethers.Contract(config.CONTRACT_ADDRESS, escrowAbi, signer);

      await contract.finishEscrowByAgent(props.escrowIndex, props.sellerAddress);
    } catch (e:any) {
      console.log(e.message);
      props.setIsExecuting(false);
    }
  };

  const releaseEscrowToBuyer = async () => {
    if (web3Provider === null) return;
    try {
      props.setIsExecuting(true);

      const signer = web3Provider.getSigner();
      const contract = new ethers.Contract(config.CONTRACT_ADDRESS, escrowAbi, signer);

      await contract.finishEscrowByAgent(props.escrowIndex, props.buyerAddress);
    } catch (e:any) {
      console.log(e.message);
      props.setIsExecuting(false);
    }
  };

  return (
    <Card
      title={`Escrow ${props.escrowIndex}`}
      bodySection={(
        <>
          <AmountSection amount={props.amount} />
          <AddressSection title="Buyer" address={props.buyerAddress} />
          <AddressSection title="Seller" address={props.sellerAddress} />
          <AddressSection title="Agent" address={props.agentAddress} />
          <StageSection stage={props.stage} />
        </>
      )}
      actionsSection={(
        <ActionsSection
          isExecuting={props.isExecuting}
          stage={props.stage}
          isBuyer={isBuyer}
          isSeller={isSeller}
          isAgent={isAgent}
          sendEscrow={sendEscrow}
          sendPayment={sendPayment}
          confirmPayment={confirmPayment}
          returnEscrowToSeller={returnEscrowToSeller}
          releaseEscrowToBuyer={releaseEscrowToBuyer}
        />
      )}
    />
  );
};

export default EscrowMain;
