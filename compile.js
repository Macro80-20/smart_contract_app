// sole prupose to compile the contracrt code
const path = require("path");
const fs = require("fs");
const solc = require("solc");
// his is going to generate a path that points directly to the inboxfile
const inboxPath = path.resolve(__dirname, "contracts", "Inbox.sol");

// now we have our path we will read the raw code
const source = fs.readFileSync(inboxPath, "utf8");

const input = {
  language: "Solidity",
  sources: {
    "Inbox.sol": {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};
const output = JSON.parse(solc.compile(JSON.stringify(input)));
console.log(output.contracts["Inbox.sol"].Inbox.metadata);
module.exports = output.contracts["Inbox.sol"].Inbox;
