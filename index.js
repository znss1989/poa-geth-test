const ethers = require('ethers');
const { performance } = require('perf_hooks');

// connect to chain
const provider = new ethers.providers.IpcProvider("\\\\.\\pipe\\geth.ipc");
const count = 200;

const mnemonic = "radar blur cabbage chef fix engine embark joy scheme fiction master release";
const basePath = "m/44'/60'/1'/0/";

const wallets = [];
for (let index = 0; index < count; ++index) {
  const path = basePath + index;
  const wallet = ethers.Wallet.fromMnemonic(mnemonic, path).connect(provider);
  wallets.push(wallet);
  // console.log(wallet.address);
}

// prefund the wallets
const bankData = {"address":"d587a57d659342e4de970f2c5bb5d97c91491671","crypto":{"cipher":"aes-128-ctr","ciphertext":"3e1005f48a9c0a465e3d72149ebf1e29a4c2ccca0502b548356e6a59ccfa3051","cipherparams":{"iv":"3723efbc8f35cf2fd4008ed27c3fada7"},"kdf":"scrypt","kdfparams":{"dklen":32,"n":262144,"p":1,"r":8,"salt":"3fc62b3be03f8c682d27d2933adfc2cb05bcb944ef1d8de9a920e9485d02ab52"},"mac":"3cf33a51ff36f1b56cb074cc773b34c32f5df8a1006628887c35575311da1bb7"},"id":"b7472403-f6ce-4a32-85de-99110e80f8fb","version":3};
const bankJson = JSON.stringify(bankData);
const bankPassword = "pwd";

const prefund = async () => {
  const bankWallet = await ethers.Wallet.fromEncryptedJson(bankJson, bankPassword);
  const bankWalletConnected = await bankWallet.connect(provider);
  const initialNonce = await bankWalletConnected.getTransactionCount();

  for (let index = 0; index < count; ++index) {
    const wallet = wallets[index];
    const nonce = initialNonce + index;
    const transaction = {
      nonce,
      to: wallet.address,
      value: ethers.utils.parseEther('0.15'),
      chainId: 1999
    };
    const tx = await bankWalletConnected.sendTransaction(transaction);
    // const balance = await provider.getBalance(wallet.address);
    // console.log(`${wallet.address}: ${balance}`);
  }
};

// have signed transactions, with bank as target wallet
const signTransactions = async () => {
  const bankWallet = await ethers.Wallet.fromEncryptedJson(bankJson, bankPassword);
  const bankWalletConnected = await bankWallet.connect(provider);
  const signedTransactions = [];
  for (let index = 0; index < count; ++index) {
    const wallet = wallets[index];
    const nonce = await wallet.getTransactionCount();
    const transaction = {
      nonce,
      to: bankWalletConnected.address,
      value: ethers.utils.parseEther('0.12'),
      chainId: 1999
    };
    const signed = await wallet.sign(transaction);
    signedTransactions.push(signed);
  }
  return signedTransactions;
};

// broadcast signed transactions
const broadcastAndGetTiming = async (signedTxs) => {
  // const start = new Date().getTime();
  const start = performance.now();
  const txPromises = [];
  for (let signed of signedTxs) {
    txPromises.push(provider.sendTransaction(signed));
  }
  Promise.all(txPromises).then(() => {
    // const end = new Date().getTime();
    const end = performance.now();
    console.log(`
    start: ${start}
    end: ${end}
    execution time: ${end - start} milliseconds
    `);
  });
};

const main = async () => {
  await prefund();
  const signedTxs = await signTransactions();
  await broadcastAndGetTiming(signedTxs);
};

main();


