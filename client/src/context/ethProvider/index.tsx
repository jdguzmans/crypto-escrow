import React, { useState, useMemo, useEffect } from 'react';
import { ethers } from 'ethers';
import * as utils from '../../utils';

declare let window: any;

export interface EthereumPvoiderContextType {
    jsonRPCProvider: any
    web3Provider: ethers.providers.Web3Provider | null
    requestProviderConnection: () => Promise<void>
    account: string | null
}

export const EthereumProviderContext = React.createContext<EthereumPvoiderContextType>({
  jsonRPCProvider: null,
  web3Provider: null,
  requestProviderConnection: async () => {},
  account: null,
});

interface IProps {
  children: React.ReactNode
}

const EthereumProviderProvider: React.FC<IProps> = ({ children }: IProps) => {
  const [account, setAccount] = useState<string | null>(null);

  const web3Provider = window.ethereum !== undefined
    ? new ethers.providers.Web3Provider(window.ethereum)
    : null;

  const _setAccount = (accountList:any) => {
    const accountToSetRaw = accountList[0];
    if (accountToSetRaw === undefined) {
      setAccount(null);
      return;
    }
    const accountToSet = utils.parseAddress(accountToSetRaw);
    setAccount(accountToSet);
  };

  useEffect(() => {
    if (web3Provider === null) return;

    const provider: any = web3Provider.provider;
    provider.on('accountsChanged', (accountList:any) => _setAccount(accountList));
  }, []);

  const loadAccount = async () => {
    if (web3Provider === null) return;

    const accountList = await web3Provider.listAccounts();
    _setAccount(accountList);
  };

  useEffect(() => {
    loadAccount();
  }, []);

  const requestProviderConnection = async () => {
    if (web3Provider === null) return;

    if (!web3Provider.provider) throw new Error('Provider not installed');
    if (!web3Provider.provider.request) throw new Error('Provider not able to execute requests');

    // https://eips.ethereum.org/EIPS/eip-1193
    const accountList = await web3Provider.provider.request({ method: 'eth_requestAccounts' });

    if (accountList[0] === undefined) return;
    setAccount(accountList[0]);
  };

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const value = {
    jsonRPCProvider: new ethers.providers.JsonRpcProvider(),
    web3Provider,
    requestProviderConnection,
    account,
  };

  return (
    <EthereumProviderContext.Provider value={value}>
      {children}
    </EthereumProviderContext.Provider>
  );
};

export default EthereumProviderProvider;
