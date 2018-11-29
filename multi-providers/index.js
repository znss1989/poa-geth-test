const ethers = require('ethers');

const { mnemonic, basePath } = require('./seed');
const getWallets = require('./getWallets');
const getBankWallet = require('./bank');
const prefund = require('./prefund');
const signTxs = require('./signTxs');
const broadcastAndGetTiming = require('./broadcastAndGetTiming');

const count = 10000;

const main = async () => {
  // get wallets and bank
  const wallets = getWallets(mnemonic, basePath, count);
  const bankWallet = await getBankWallet();
  // const balance = await bankWallet.getBalance();
  // console.log(balance);

  // prefund from bank to wallets
  await prefund(bankWallet, wallets);

  // sign transactions
  const signedTxs = await signTxs(bankWallet, wallets);

  // // broadcast amd performance measure
  await broadcastAndGetTiming(signedTxs, count);
};

main();
