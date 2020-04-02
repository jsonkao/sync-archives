const fs = require('fs').promises;
const axios = require('axios');
require('dotenv').config();

const headers = { 'Authorization': 'token ' + process.env.TOKEN };

const CONTENT_PATH = 'https://api.github.com/repos/jsonkao/lionshare-scraper/contents/archive-postings/columbia';

// Create a file
function putFile(fname) {
  return fs.readFile(fname, { encoding: 'utf-8' })
    .then(contents => axios.request({
      url: CONTENT_PATH,
      data: { content: contents },
      headers,
      maxBodyLength: Infinity,
      maxContentLength: Infinity,
    }))
    .then(response => console.log(response))
    .catch(e => {
      Object.keys(e.config).forEach(k => k !== 'data' && console.log(k, e.config[k]))
    })
}

async function main() {
  if (process.argv.length != 4) {
    console.log('usage: node upload.js <inputPath> <contentPath>');
    return;
  }

  const files = (await fs.readdir(process.argv[2]))
    .filter(fname => fname.includes('.json'))
    .map(fname => input + '/' + fname);

  await putFile(files[0], process.argv[3]);
}

main();
