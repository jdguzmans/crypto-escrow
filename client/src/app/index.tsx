import * as React from 'react';
import { Routes, Route } from 'react-router-dom';

import EthereumProvider from '../context/ethProvider';

import Layout from './layout';

import HomeView from '../views/home';
import NewEscrowView from '../views/newEscrow';
import EscrowView from '../views/escrow';

const App = () => (
  <EthereumProvider>
    <Layout>
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/new-escrow" element={<NewEscrowView />} />
        <Route path="/escrows/:escrowIndex" element={<EscrowView />} />
      </Routes>
    </Layout>
  </EthereumProvider>
);

export default App;
