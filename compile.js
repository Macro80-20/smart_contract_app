// sole prupose to compile the contract code
import path from 'path';
import fs from 'fs';
import solc from 'solc';
// eslint-disable-next-line no-underscore-dangle
const __dirname = path.resolve();
// this is going to generate a path that points directly to the inboxfile
const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');

// now we have our path we will read the raw code
const source = fs.readFileSync(inboxPath, 'utf8');

const input = {
  language: 'Solidity',
  sources: {
    'Inbox.sol': {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*'],
      },
    },
  },
};
const output = JSON.parse(solc.compile(JSON.stringify(input)));

const InboxContract = output.contracts['Inbox.sol'].Inbox;

export default InboxContract;
