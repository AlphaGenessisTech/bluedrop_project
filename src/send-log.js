const http = require('http');
const fs = require('fs');
const path = require('path');

/**
 * Sends a device log file to a remote server using HTTP POST.
 * @param {string} logFilePath - The path of the log file to send.
 */
function sendLog(logFilePath) {
  const filename = path.basename(logFilePath);
  const fileStream = fs.createReadStream(logFilePath);

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': `attachment; filename="${filename}"`
    }
  };

  const req = http.request('http://example.com/upload', options, (res) => {
    console.log(`Log file "${filename}" sent successfully. Server responded with status code ${res.statusCode}.`);
  });

  req.on('error', (err) => {
    console.error(`Error sending log file "${filename}": ${err}`);
  });

  fileStream.pipe(req);
}

module.exports = sendLog;
