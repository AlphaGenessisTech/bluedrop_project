// index.js
const { sendLog } = require('./src/log-sender');
const { extractThermistors } = require('./src/thermistor-extractor');
const { extractThermistorsData } = require('./src/thermistor-data-extractor');

module.exports = {
  sendLog,
  extractThermistors,
  extractThermistorsData
};
const { sendLog } = require('<package-bluedrop>');

sendLog('//Users/katmg/Documents/logproject/log.txt', 'http://apples.com/logs');
