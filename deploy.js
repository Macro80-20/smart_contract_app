/* eslint-disable no-unused-vars */
// take some compiled code and deploy to a network
import compiledFile from './compile';

const { abi } = compiledFile;
const { bytecode: { object } } = compiledFile.evm;
