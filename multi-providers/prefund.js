const ethers = require('ethers');

module.exports = async (bankWallet, wallets) => {
  const initialNonce = await bankWallet.getTransactionCount();
  for (let index = 0; index < wallets.length; ++index) {
    const wallet = wallets[index];
    const nonce = initialNonce + index;
    const transaction = {
      nonce,
      to: wallet.address,
      value: ethers.utils.parseEther('0.15'),
      chainId: 1999
    };
    await bankWallet.sendTransaction(transaction);
  }
  console.log("prefunding finished.");
};