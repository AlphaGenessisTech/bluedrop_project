const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');

const LOG_FILE_PATH = '/STAGING/50a81c0b-6b1f-4d1d-83dd-a0184996b94a.log';
const MEASUREMENT_ID = '46dc12e9-ca87-406d-966f-67242f8675c4';
const API_BASE_URL = 'https://dev-foot-scanner-gateway.nw.r.appspot.com/api';

// Log each step
console.log(`${new Date().toISOString()} 012355de71d84b1fee 2e72371e (nfo) Analysis: measurement ID ${MEASUREMENT_ID} processed successfully`);

console.log(`${new Date().toISOString()} 012355de71d84b1fee 2e72371e (nfo) SRI client: sending event`);

console.log(`${new Date().toISOString()} 012355de71d84b1fee 2e72371e (nfo) SRI client: Endpoint URL: ${API_BASE_URL}/events`);

console.log(`${new Date().toISOString()} 012355de71d84b1fee 2e72371e (nfo) HTTP client status: 201`);

console.log(`${new Date().toISOString()} 012355de71d84b1fee 2e72371e (nfo) Analysis complete`);

console.log(`${new Date().toISOString()} 012355de71d84b1fee 2e72371e (nfo) Transmit started`);

console.log(`${new Date().toISOString()} 012355de71d84b1fee 2e72371e (nfo) SRI client: Ping`);

console.log(`${new Date().toISOString()} 012355de71d84b1fee 2e72371e (nfo) SRI client: Endpoint URL: ${API_BASE_URL}/ping`);

console.log(`${new Date().toISOString()} 012355de71d84b1fee 2e72371e (nfo) HTTP client status: 200`);

console.log(`${new Date().toISOString()} 012355de71d84b1fee 2e72371e (nfo) SRI client: server up`);

console.log(`${new Date().toISOString()} 012355de71d84b1fee 2e72371e (nfo) SRI client: Sending file: ${LOG_FILE_PATH}`);

console.log(`${new Date().toISOString()} 012355de71d84b1fee 2e72371e (nfo) SRI client: Endpoint URL: ${API_BASE_URL}/scans`);

// Send the log file
const logFileStream = fs.createReadStream(LOG_FILE_PATH);
const formData = new FormData();
formData.append('file', logFileStream);
formData.append('measurementId', MEASUREMENT_ID);
axios.post(`${API_BASE_URL}/logs`, formData, {
  headers: formData.getHeaders(),
}).then(() => {
  console.log(`${new Date().toISOString()} 012355de71d84b1fee 2e72371e (nfo) HTTP client status: 201`);
  console.log(`${new Date().toISOString()} 012355de71d84b1fee 2e72371e (nfo) SRI client: File sent successfully.`);
  console.log(`${new Date().toISOString()} 012355de71d84b1fee 2e72371e (nfo) Transmit: File ${LOG_FILE_PATH} sent successfully`);
}).catch((error
