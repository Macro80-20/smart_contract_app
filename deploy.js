/* eslint-disable no-unused-vars */

import Web3 from 'web3';
import HDWalletProvider from '@truffle/hdwallet-provider';
import InboxContract from './compile';

const mnemonicPhrase = 'spin sample assault announce husband post salute fuel borrow happy donor true';
const url = 'https://mainnet.infura.io/v3/https://rinkeby.infura.io/v3/1852e4ccdcf74ff2b97f940fe148aa5e';
const { abi } = InboxContract;
const { bytecode: { object } } = InboxContract.evm;

const INITIAL_DEFAULT_MESSAGE = 'I am the first instance created';
const provider = new HDWalletProvider({
  mnemonic: {
    phrase: mnemonicPhrase,
  },
  // URI or Ethereum client to send all other non-transaction-related Web3 requests
  providerOrUrl: url,
});

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  const inbox = await new web3.eth.Contract(abi)
    .deploy({ data: object, arguments: [INITIAL_DEFAULT_MESSAGE] })
    .send({ from: accounts[0] });
  console.log('Contract deployed to address', inbox.options.address);
};

deploy();

// step 1
// The purpose of the module HDWALLETPROVIDER  is to both connect to some target network and unlock and account

// for use on that network.

// In this case we unlocked to count by using our 12 word account mnemonic right here by providing just

// this mnemonic we are able to unlock and generate the public key private key an address of our account.

// We specify that our provider should connect to an real node.

// step 2
// After setting up this provider we then fed that provider to our Web 3 instance and then we had a copy

// of web 3 right here that was pre-configured to connect to the ring to the network and had already unlocked

// one of our accounts which has some ether and could be used to deploy our contract.
