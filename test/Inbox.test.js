/* eslint-disable class-methods-use-this */
import assert from 'assert';
// Ganache hosts a local test network
// automatically generate some number of accounts.
// We can send transactions to this network we can deploy contracts to this network.
import ganache from 'ganache-cli';
import Web3 from 'web3';
import pkg from 'mocha';

// eslint-disable-next-line import/extensions
import InboxContract from '../compile.js';

const { describe, it, beforeEach } = pkg;
const provider = ganache.provider();
const web3 = new Web3(provider);
const INITIAL_DEFAULT_MESSAGE = 'Hi there';
const UPDATED_MESSAGE = 'Bye';
let accounts;
let inbox;

beforeEach(async () => {
  const { abi } = InboxContract;
  const { bytecode: { object } } = InboxContract.evm;
  accounts = await web3.eth.getAccounts();
  inbox = await new web3.eth.Contract(abi).deploy({ data: object, arguments: [INITIAL_DEFAULT_MESSAGE] }).send({ from: accounts[0], gas: '1000000' });
});

describe('Inbox', async () => {
  it('deploys a contract', () => {
    assert.ok(inbox.options.address);
  });
  it('has a default message', async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, INITIAL_DEFAULT_MESSAGE);
  });
  it('can change message', async () => {
    // since we are modifying data we are sending
    const transactionReciept = await inbox.methods.setMessage(UPDATED_MESSAGE).send({ from: accounts[0], gas: '1000000' });
    console.log(transactionReciept);
    const message = await inbox.methods.getMessage().call();
    assert.equal(message, UPDATED_MESSAGE);
  });
});
