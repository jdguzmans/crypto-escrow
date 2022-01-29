import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Ethers from 'ethers';
import { EthereumPvoiderContextType, EthereumProviderContext } from '../../context/ethProvider';

import escrowAbi from '../../smartContract/abi.json';

import * as config from '../../config';

import Card from '../../components/card';

import {
  FormContainer,
} from './styles';
import ActionsSection from './actionsSection';

const NewEscrowView = () => {
  const navigate = useNavigate();

  const ethereumProviderContext = useContext<EthereumPvoiderContextType>(EthereumProviderContext);
  const { web3Provider } = ethereumProviderContext;

  const [isDeploying, setIsDeploying] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [amountEthStr, setAmountEthStr] = useState<string>('0');
  const onChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value === '') {
      setAmountEthStr('0.0');
      return;
    }
    const valueNumber = Number(value);
    if (Number.isNaN(valueNumber)) return;
    setAmountEthStr(value);
  };

  const [buyer, setBuyer] = useState<string | null>('0xcBb308235B0A45fe974CB5A7195172C4CE975005');
  const onChangeBuyer = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBuyer(event.target.value);
  };

  const [seller, setSeller] = useState<string | null>('0x08F546f24E0b3FAF53353b82808c79e1656254c0');
  const onChangeSeller = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSeller(event.target.value);
  };

  const [agent, setAgent] = useState<string | null>('0x7a0B7Ec0a19F22B177443d42A46DF1564c535956');
  const onChangeAgent = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAgent(event.target.value);
  };

  const onSubmit = async () => {
    if (web3Provider === null) return;
    try {
      setErrorMessage(null);
      setIsDeploying(true);
      const signer = web3Provider.getSigner();

      const contract = new Ethers.ethers.Contract(
        config.CONTRACT_ADDRESS,
        escrowAbi,
        signer,
      );

      const amountWei = Ethers.utils.parseEther(amountEthStr);

      const transaction = await contract.createEscrow(buyer, seller, agent, amountWei);
      const receipt = await transaction.wait();
      const events = receipt.events;

      const createdEscroEvent = events.find((e:any) => e.event === 'CreatedEscrow');
      if (createdEscroEvent === undefined) throw new Error('aassfa'); // TODO: DISPLAY IN UI

      const newEscrowIndexArg = createdEscroEvent.args;
      const escrowIndex = newEscrowIndexArg.escrowIndex.toNumber();

      navigate(`/escrows/${escrowIndex}`);
    } catch (e:any) {
      console.log(e);
      const code = e.code;

      if (code === 4001) {
        setIsDeploying(false);
        return;
      }

      setIsDeploying(false);
      setErrorMessage(e.message);
    }
  };

  return (

    <Card
      title="New escrow"
      bodySection={(
        <FormContainer>
          <div>Value (ETH)</div>
          <input
            type="number"
            value={amountEthStr}
            onChange={onChangeValue}
          />
          <div>Buyer</div>
          <input
            type="text"
            value={buyer !== null ? buyer : ''}
            onChange={onChangeBuyer}
          />
          <div>Seller</div>
          <input
            type="text"
            value={seller !== null ? seller : ''}
            onChange={onChangeSeller}
          />
          <div>Agent</div>
          <input
            type="text"
            value={agent !== null ? agent : ''}
            onChange={onChangeAgent}
          />
        </FormContainer>
      )}
      actionsSection={(
        <ActionsSection
          isDeploying={isDeploying}
          errorMessage={errorMessage}
          onSubmit={onSubmit}
        />
      )}
    />
  );
};

export default NewEscrowView;
