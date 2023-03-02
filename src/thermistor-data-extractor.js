const fs = require('fs');
const path = require('/Users/katmg/Documents/logproject/log.txt');

/**
 * Extracts device thermistors sensor measurements from a log file
 * and stores them into a JSON file with the device ID as the filename prefix.
 * @param {string} logFilePath - The path of the log file to extract data from.
 */
function extractThermistorsData(logFilePath) {
  // Read the log file contents
  const logData = fs.readFileSync(logFilePath, 'utf8');

  // Find all the thermistor sensor measurements in the log file
  const thermistorRegex = /Thermistor (\d) measured (\d+\.\d+) degC/;
  const matches = logData.match(new RegExp(thermistorRegex, 'g'));

  // Transform the matches into a JSON structure
  const data = matches.map(match => {
    const [_, sensorId, temperature] = match.match(thermistorRegex);
    return
  });

  // Get the device ID from the log file name
  const deviceId = path.basename(logFilePath).split('.')[0];

  // Write the data to a JSON file with the device ID as the filename prefix
  const outputFilePath = `${deviceId}-thermistors.json`;
  fs.writeFileSync(outputFilePath, JSON.stringify(data, null, 2));

  console.log(`Thermistors data extracted from ${logFilePath} and saved to ${outputFilePath}.`);
}
extractThermistorsData('/Users/katmg/Documents/logproject/log.txt');
