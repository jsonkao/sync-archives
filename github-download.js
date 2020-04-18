const fs = require('fs');
const axios = require('axios');
const chalk = require('chalk');
require('dotenv').config();

const { ROOT } = require('./constants.js');
const headers = { 'Authorization': 'token ' + process.env.TOKEN };

// Download a GitHub file and write it to ./outputs
function downloadFile(gitFile, outputPath) {
  const { name, download_url } = gitFile;
  return axios.request({ url: download_url, headers, responseType: 'stream' })
    .then(response => writeToFile(response.data, outputPath + '/' + name))
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
  if (process.argv.length != 4) {
    console.log('usage: node github-download.js <contentPath> <outputPath>');
    return;
  }

  // Create output if it doesn't exist
  const outputPath = process.argv[3];
  if (!fs.existsSync(outputPath)) {
    console.log(`Making directory ${outputPath} because it doesn't exist.`);
    fs.mkdirSync(outputPath);
  }

  // Get contents
  const { data } = await axios.request({
    url: ROOT + process.argv[2],
    headers,
  });
  console.log(`Downloading ${len(data)} items.`)

  // Run downloads concurrently
  promiseAllProgress(
    data.map(d => downloadFile(d, outputPath)),
    n => console.log(`Proportion done = ${n.toFixed(2)}`),
  );

  // Run downloads synchronously
  // for (const file of data)
    // await downloadFile(file);
}

main().catch(console.error);
