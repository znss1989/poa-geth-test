const ethers = require('ethers');

const getIpcProvider = require('./getIpcProvider');

const bankData = {"address":"d587a57d659342e4de970f2c5bb5d97c91491671","crypto":{"cipher":"aes-128-ctr","ciphertext":"3e1005f48a9c0a465e3d72149ebf1e29a4c2ccca0502b548356e6a59ccfa3051","cipherparams":{"iv":"3723efbc8f35cf2fd4008ed27c3fada7"},"kdf":"scrypt","kdfparams":{"dklen":32,"n":262144,"p":1,"r":8,"salt":"3fc62b3be03f8c682d27d2933adfc2cb05bcb944ef1d8de9a920e9485d02ab52"},"mac":"3cf33a51ff36f1b56cb074cc773b34c32f5df8a1006628887c35575311da1bb7"},"id":"b7472403-f6ce-4a32-85de-99110e80f8fb","version":3};
const bankPassword = "pwd";

module.exports = async () => {
  const bankJson = JSON.stringify(bankData);
  const provider = getIpcProvider();
  const wallet = await ethers.Wallet.fromEncryptedJson(bankJson, bankPassword)
  const bankWallet = wallet.connect(provider);
  return bankWallet
};