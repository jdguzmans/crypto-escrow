# Crypto Escrow

P2P System for exchanging real world assets for crypto.

This repo contains the Solidty contract and a React web client.

This was built just for fun.

# How it works

In this system, *buyer* and *seller* want to execute a transaction in which *buyer* offers an off-chain asset or service in exchange from cryptocurrency from *seller*. The validation of *buyer*'s responsibility on this transaction is not verifiable on chain, hence *seller* sends the funds into escrow, and these are released after both *buyer* and *seller* confirm that the payment has been done. In case *buyer* and *seller* don't agree that the payment has been done, a third party, escrow agent or just *agent*, decides whether the escrow funds should be returned to *seller* or released to *buyer*.

# How to run on development mode

1. Deploy the smart contract on the ethereum-compatible blockchain you prefer. I recommend to run a local development node with [geth](https://geth.ethereum.org/). You can deploy the smart contract using [remix](https://remix.ethereum.org/), if you are running your own node you need to make sure to add remix as a cors domain. fn the address the contract is deployed.
2. Install the dependencies on the client with `npm install` and run it with `npm run dev`, make sure you are running it with the environment variable REACT_APP_CONTRACT_ADDRESS set as the address the smart contract is deployed on. If you are running you rown node you need to make sure to add localhost:3000 as cors domain.