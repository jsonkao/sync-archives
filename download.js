const fs = require('fs');
const axios = require('axios');
const chalk = require('chalk');
require('dotenv').config();

const OUTPUT_DIR = './outputs';
const headers = { 'Authorization': 'token ' + process.env.TOKEN };

// Download a file
function downloadFile(gitFile) {
  const { name, download_url } = gitFile;
  return axios.request({ url: download_url, headers, responseType: 'stream' })
    .then(response => writeToFile(response.data, OUTPUT_DIR + '/' + name))
    .then(() => console.log(chalk.green(chalk.bold('Downloaded'), name)))
    .catch(err => {
      console.error(err, gitFile);
    })
}

// Pipe data to a file
function writeToFile(data, filename) {
  return new Promise((resolve, reject) => {
    const w = fs.createWriteStream(filename);
    data.pipe(w);
    w.on('finish', resolve);
    w.on('error', reject);
  });
}

// Promise progress callback
function promiseAllProgress(promises, callback) {
  let n = 0;
  callback(n);
  for (const p of promises)
    p.then(() => {
      n++;
      callback(n / promises.length);
    });
  return Promise.all(promises);
}

async function main() {
  if (process.argv.length != 3) {
    console.log('usage: node download.js <contentPath>');
    return;
  }

  // Get contents
  const { data } = await axios.request({
    url: process.argv[2],
    headers,
  });

  // Run downloads concurrently
  promiseAllProgress(data.map(downloadFile), n => console.log(`Proportion done = ${n.toFixed(2)}`))

  // Run downloads synchronously
  // for (const file of data)
    // await downloadFile(file);
}

main();
