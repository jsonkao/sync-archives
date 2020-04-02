A script for retrieving scraper archives that are stored on GitHub.

## Setup

1. Clone this directory and `npm install`.

2. Create a `.env` file. Set `TOKEN` to your [OAuth token](https://help.github.com/articles/creating-an-access-token-for-command-line-use).

## Downloading an archive

<pre>
$ node download.js <var>CONTENT_PATH</var>
</pre>

The content path should be of the form `https://api.github.com/repos/:owner/:repo/contents/:path`.

Archives will be written into `./outputs`.

## Uploading an archive

<pre>
$ node upload.js <var>INPUT_PATH</var> <var>CONTENT_PATH</var>
</pre>

The input path is a local directory. The content path should be of the form `https://api.github.com/repos/:owner/:repo/contents/:path`.
