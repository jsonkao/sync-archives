const fs = require('fs');
const axios = require('axios');
require('dotenv').config();

const OUTPUT_DIR = './outputs';
const headers = { 'Authorization': 'token ' + process.env.TOKEN };

// Download a file
function downloadFile(gitFile) {
  const { name, download_url } = gitFile;
  return axios.request({ url: download_url, headers, responseType: 'stream' })
    .then(response => response.data.pipe(fs.createWriteStream('outputs/' + name)));
}

// Create output directory if it doesn't exist
if (fs.existsSync(OUTPUT_DIR))
  fs.mkdirSync(OUTPUT_DIR);

// Get contents
axios.request({
  url: process.env.CONTENTS_PATH,
  headers
})
  // Download each file
  .then(response => Promise.all(response.data.map(downloadFile)))
  // If error, log it
  .catch(console.error);
