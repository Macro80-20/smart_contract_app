// take some compiled code and deploy to a network
const compiledFile = require("./compile");

const interface = compiledFile.abi;
const bytecode = compiledFile.evm.bytecode.object;
const metaData = compiledFile.metadata;
console.log("Bytecode", bytecode);
console.log("Interface", interface);
console.log("MetaData", JSON.parse(metaData));
