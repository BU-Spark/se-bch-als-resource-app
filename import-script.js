require('dotenv').config();
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const STRAPI_URL = 'http://127.0.0.1:1338';
const DIRECTORY_PATH = './Strapi_Content_and_structure_example';

// Read JSON data from a file
function readJsonFile(filePath) {
  const rawData = fs.readFileSync(filePath);
  return JSON.parse(rawData);
}

// Import data into Strapi
async function importData(data, endpoint) {
  try {
    // Check if data is an array, if not, make it an array
    if (!Array.isArray(data)) {
      data = [data];
    }

    for (const item of data) {
      const payload = { data: item };
      await axios.put(`${STRAPI_URL}${endpoint}`, payload);
      console.log(`Imported to ${endpoint}: ${JSON.stringify(item)}`);
    }
    console.log(`Data import to ${endpoint} completed.`);
  } catch (error) {
    console.error('Error importing data:', error);
  }
}

// Execute the script
async function runImport() {
  fs.readdir(DIRECTORY_PATH, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return;
    }

    files.forEach(file => {
      if (path.extname(file) === '.json') {
        const endpoint = `/api/${path.basename(file, '.json')}`;
        const filePath = path.join(DIRECTORY_PATH, file);
        const data = readJsonFile(filePath);
        importData(data, endpoint);
      }
    });
  });
}

runImport();
