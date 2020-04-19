A collection of scripts for syncing local and remote archives.

## Setup

1. Clone this directory and `npm install`.

2. For archives on GitHub: Create a `.env` file. Set `TOKEN` to your [OAuth token](https://help.github.com/articles/creating-an-access-token-for-command-line-use) (use spec-scraper-bot if you can). Add `.env` to your [`.gitignore`](https://guide.freecodecamp.org/git/gitignore/).

3. For archives on S3: Configure `spec-graphics` AWS credentials.

## Downloading an archive

### GitHub

<pre>
$ node github-download.js <var>CONTENT_PATH</var> <var>OUTPUT_PATH</var>
</pre>

The content path should be of the form `/repos/:owner/:repo/contents/:path`.

The output path is a local directory. The script will make the output path if it doesn't already exist.

### S3

_In progress._

### Uploading an archive

### GitHub

<pre>
$ node github-upload.js <var>CONTENT_PATH</var> <var>INPUT_PATH</var>
</pre>

The content path should be of the form `/repos/:owner/:repo/contents/:path`.

The input path is a local directory. The script will make the input path if it doesn't already exist.

### S3

_In progress._
