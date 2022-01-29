import React, { useEffect, useState, useContext } from 'react';
import { BigNumber, ethers } from 'ethers';
import { useParams } from 'react-router-dom';

import escrowAbi from '../../smartContract/abi.json';
import { EthereumPvoiderContextType, EthereumProviderContext } from '../../context/ethProvider';

import * as utils from '../../utils';
import * as config from '../../config';

import EscrowMain from './main';
import { ErrorMessage } from './styles';

const EscrowView = () => {
  const { escrowIndex: escrowIndexRaw } = useParams();
  const escrowIndex = escrowIndexRaw !== undefined
    ? Number(escrowIndexRaw)
    : null;

  const ethereumProviderContext = useContext<EthereumPvoiderContextType>(EthereumProviderContext);
  const jsonRPCProvider = ethereumProviderContext.jsonRPCProvider;

  const [isLoading, setIsLoading] = useState(true);
  const [loadingErrorMessage, setLoadingErrorMessage] = useState<string | null>(null);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);

  const [stage, setStage] = useState<number | null>(null);
  const [amount, setAmount] = useState<BigNumber | null>(null);
  const [buyerAddress, setBuyerAddress] = useState<string | null>(null);
  const [sellerAddress, setSellerAddress] = useState<string | null>(null);
  const [agentAddress, setAgentAddress] = useState<string | null>(null);

  useEffect(() => {
    const loadEscrow = async () => {
      if (escrowIndex === null) return;
      try {
        if (Number.isNaN(escrowIndex)) {
          setLoadingErrorMessage('Escrow index not valid.');
          return;
        }

        const contract = new ethers.Contract(
          config.CONTRACT_ADDRESS,
          escrowAbi,
          jsonRPCProvider,
        );

        console.log('deployed', await contract.deployed());

        const thisBlockNumber = await jsonRPCProvider.getBlockNumber();

        const loadedEscrow = await contract.escrows(escrowIndex);

        const loadedBuyerAddressRaw = loadedEscrow.buyer;
        const loadedBuyerAddress = utils.parseAddress(loadedBuyerAddressRaw);

        if (utils.isDefaultAddress(loadedBuyerAddress)) {
          setLoadingErrorMessage('Escrow not found');
          return;
        }

        setBuyerAddress(loadedBuyerAddress);

        const loadedSellerAddressRaw = loadedEscrow.seller;
        const loadedSellerAddress = utils.parseAddress(loadedSellerAddressRaw);
        setSellerAddress(loadedSellerAddress);

        const loadedAgentAddressRaw = loadedEscrow.agent;
        const loadedAgentAddress = utils.parseAddress(loadedAgentAddressRaw);
        setAgentAddress(loadedAgentAddress);

        const loadedAmount = loadedEscrow.amount;
        setAmount(loadedAmount);

        const loadedStage = loadedEscrow.stage;
        setStage(loadedStage);

        contract.on('StageChange', async (
          eventEscrowIndexBN: BigNumber,
          newStage: number,
          { blockNumber },
        ) => {
          const eventEscrowIndex = eventEscrowIndexBN.toNumber();

          if (eventEscrowIndex !== escrowIndex) return;
          if (thisBlockNumber >= blockNumber) return;

          if (isExecuting) setIsExecuting(false);
          setStage(newStage);
        });

        setIsLoading(false);
      } catch (e:any) {
        setLoadingErrorMessage(e.message);
      } finally {
        setIsLoading(false);
      }
    };
    loadEscrow();
  }, []);

  if (isLoading) {
    return (
      <h2>Loading...</h2>
    );
  }

  if (loadingErrorMessage !== null) {
    return (
      <ErrorMessage>{`Error: ${loadingErrorMessage}`}</ErrorMessage>
    );
  }

  if (
    escrowIndex === null || amount === null || stage === null
    || buyerAddress === null || sellerAddress === null || agentAddress === null
  ) {
    return (
      <ErrorMessage>Application Error</ErrorMessage>
    );
  }

  return (
    <EscrowMain
      isExecuting={isExecuting}
      setIsExecuting={setIsExecuting}
      escrowIndex={escrowIndex}
      amount={amount}
      stage={stage}
      buyerAddress={buyerAddress}
      sellerAddress={sellerAddress}
      agentAddress={agentAddress}
    />
  );
};

export default EscrowView;
