const ethers = require('ethers');

const { mnemonic, basePath } = require('./seed');
const getIpcProvider = require('./getIpcProvider');
const getBankWallet = require('./bank');

getBankWallet().then(w => {
  console.log(w);
});

const index = 700;
const path = basePath + index;
const wallet = ethers.Wallet.fromMnemonic(mnemonic, path);
const provider = getIpcProvider();
const target = wallet.connect(provider);

provider.getBalance(target.address)
  .then(balance => {
    const balanceInEther = ethers.utils.formatEther(balance);
    console.log(`$${target.address} balance: ${balanceInEther}`);
  });

