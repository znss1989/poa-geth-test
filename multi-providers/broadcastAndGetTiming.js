const { performance } = require('perf_hooks');

const getIpcProvider = require('./getIpcProvider');

module.exports = async (signedTxs, counter) => {
  console.log("start timing...");
  const start = performance.now();
  // const txPromises = [];
  const checkPrint = () => {
    --counter;
    if (counter <= 0) {
      const end = performance.now();
      console.log(`end timing....
      start: ${start}
      end: ${end}
      execution time: ${end - start} milliseconds
      `);
    }
  };
  for (let signed of signedTxs) {
    const provider = getIpcProvider();
    // txPromises.push(provider.sendTransaction(signed));
    provider.sendTransaction(signed)
      .then(checkPrint)
      .catch(checkPrint);
  }
  
  // Promise.all(txPromises).then(() => {
  //   const end = performance.now();
  //   console.log(`end timing....
  //   start: ${start}
  //   end: ${end}
  //   execution time: ${end - start} milliseconds
  //   `);
  // });
};
