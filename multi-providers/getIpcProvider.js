const ethers = require('ethers');

module.exports = () => {
  return new ethers.providers.IpcProvider("\\\\.\\pipe\\geth.ipc");
};