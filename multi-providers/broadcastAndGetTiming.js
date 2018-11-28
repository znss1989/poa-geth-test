const { performance } = require('perf_hooks');

const getIpcProvider = require('./getIpcProvider');

module.exports = async (signedTxs) => {
  const start = performance.now();
  const txPromises = [];
  for (let signed of signedTxs) {
    const provider = getIpcProvider();
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
