const ethers = require('ethers');

module.exports = async (bankWallet, wallets) => {
  const signedTxs = [];
  for (let index = 0; index < wallets.length; ++index) {
    const wallet = wallets[index];
    const nonce = await wallet.getTransactionCount();
    const transaction = {
      nonce,
      gasLimit: 3000000,
      to: bankWallet.address,
      value: ethers.utils.parseEther("0.12"),
      chainId: 1999
    }
    const signedTx = wallet.sign(transaction);
    signedTxs.push(signedTx);
  }
  return signedTxs;
};