/* eslint-disable class-methods-use-this */
import assert from 'assert';
import ganache from 'ganache-cli';
import Web3 from 'web3';
import pkg from 'mocha';

import InboxContract from '../compile';

const { describe, it, beforeEach } = pkg;
const provider = ganache.provider();
const web3 = new Web3(provider);

let accounts;
let inbox;

beforeEach(async () => {
  const { abi } = InboxContract;
  const { bytecode: { object } } = InboxContract.evm;
  accounts = await web3.eth.getAccounts();
  inbox = await new web3.eth.Contract(abi).deploy({ data: object, arguments: ['Hi there!'] }).send({ from: accounts[0], gas: '1000000' });
});

describe('Inbox', async () => {
  it('deploys a contract', () => {
    assert.ok(inbox.options.address);
  });
  it('has a default message', async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, 'Hi there!');
  });
});
