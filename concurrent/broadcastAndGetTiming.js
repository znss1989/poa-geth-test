const { performance } = require('perf_hooks');
const pidusage = require('pidusage');

const getIpcProvider = require('./getIpcProvider');

module.exports = async (signedTxs, counter) => {
  console.log("start timing...");
  const start = performance.now();
  
  const nIntervalId = setInterval(() => {
    pidusage(process.pid, (err, stats) => {
      console.log(stats)
      // => {
      //   cpu: 10.0,            // percentage (from 0 to 100*vcore)
      //   memory: 357306368,    // bytes
      //   ppid: 312,            // PPID
      //   pid: 727,             // PID
      //   ctime: 867000,        // ms user + system time
      //   elapsed: 6650000,     // ms since the start of the process
      //   timestamp: 864000000  // ms since epoch
      // }
    })
  }, 200);

  // const txPromises = [];

  const checkPrint = () => {
    --counter;
    if (counter <= 0) {
      clearInterval(nIntervalId);
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
