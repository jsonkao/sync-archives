const fs = require('fs').promises;
const axios = require('axios');
const chalk = require('chalk');
const pLimit = require('p-limit');
require('dotenv').config();

const { ROOT } = require('./constants.js');
const headers = { 'Authorization': 'token ' + process.env.TOKEN };

// Create a file
function putFile(origin, destination) {
  return fs.readFile(origin)
    .then(contents => {
      console.log('Uploading', origin);
      return axios.request({
        method: 'put',
        url: ROOT + destination,
        data: {
          content: contents.toString('base64'),
          message: 'Upload via GitHub API: ' + destination,
        },
        headers,
        maxBodyLength: Infinity,
        maxContentLength: Infinity,
      });
    })
    .then(() => console.log(chalk.green(chalk.bold('Uploaded'), destination)))
    .catch(error => {
      const { response } = error;
      if (response.data.message.includes(`"sha" wasn't supplied.`))
        console.error(chalk.red(chalk.bold('File already exists:'), destination));
      else
        console.error(chalk.red(chalk.bold('Failed to put'), origin, 'at', destination));
    });
}

async function main() {
  if (process.argv.length != 4) {
    console.log('usage: node upload.js <inputPath> <contentPath>');
    return;
  }
  const inputPath = process.argv[2];
  const contentPath = process.argv[3];

  // Concurrency (plimit > 1) leads to a general, non-file-existing errors
  const limit = pLimit(1);
  const promises = (await fs.readdir(inputPath))
    .filter(fname => fname.includes('.json'))
    .map(fname => limit(() => putFile(inputPath + '/' + fname, contentPath + '/' + fname)));

  await Promise.all(promises);
}

main().catch(console.error);
