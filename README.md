A script for retrieving scraper archives that are stored on GitHub.

## Setup

1. Clone this directory and `npm install`.

2. Create a `.env` file. Set `TOKEN` to your [OAuth token](https://help.github.com/articles/creating-an-access-token-for-command-line-use). Set `CONTENTS_PATH` to the directory that contains the archive. It should be of the form `https://api.github.com/repos/:owner/:repo/contents/:path`.

## Usage

```
$ node index.js
```

Archives will be written into `./outputs`.
