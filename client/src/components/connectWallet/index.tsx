import React, { useContext } from 'react';
import styled from 'styled-components';
import { EthereumPvoiderContextType, EthereumProviderContext } from '../../context/ethProvider';
import * as config from '../../config';
import Button from '../button';

const ConnectWallet = () => {
  return (
    <StyledMain>
      <ContractAddress />
      <Account />
    </StyledMain>
  );
};

const Account = () => {
  const ethereumProviderContext = useContext<EthereumPvoiderContextType>(EthereumProviderContext);
  const { web3Provider, requestProviderConnection, account } = ethereumProviderContext;

  if (web3Provider === null) {
    return (
      <div>
        Wallet not installed
      </div>
    );
  }
  if (account === null) {
    return (
      <Button
        type="button"
        onClick={() => requestProviderConnection()}
      >
        Connect Wallet
      </Button>
    );
  }

  return (
    <div>
      <b>Account: </b>
      {account}
    </div>
  );
};

const ContractAddress = () => {
  return (
    <div>
      <b>Contract address: </b>
      {config.CONTRACT_ADDRESS}
    </div>
  );
};

const StyledMain = styled.div`
  text-align: center;
`;

export default ConnectWallet;
