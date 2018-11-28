const ethers = require('ethers');

const getIpcProvider = require('./getIpcProvider');

module.exports = (mnemonic, basePath, count) => {
  const wallets = [];
  for (let index = 0; index < count; ++index) {
    const path = basePath + index;
    const provider = getIpcProvider();
    const wallet = ethers.Wallet.fromMnemonic(mnemonic, path)
      .connect(provider);
    wallets.push(wallet);
  }
  return wallets;
};
