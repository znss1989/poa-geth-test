const ethers = require('ethers');

module.exports = () => {
  // return new ethers.providers.IpcProvider("\\\\.\\pipe\\geth.ipc");
  const url = "http://127.0.0.1:8545";
  return new ethers.providers.JsonRpcProvider(url);
};