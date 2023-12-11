require('dotenv').config()
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const API_URL = 'http://127.0.0.1:1338'; //either modify this line or update .env credentials
const dataDirectory = './Strapi_Content_and_structure_example';

const collectionTypes = [
  { name: 'choice-to-question-maps', totalEntries: 150 },
  { name: 'first-entries', totalEntries: 5 }, // Example total entries
  { name: 'question-to-choice-maps', totalEntries: 80 },
  { name: 'solutions', totalEntries: 70 },
  { name: 'tree-levels', totalEntries: 5 },
  { name: 'bookmarks', totalEntries: 10 }
];

// Ensure the directory exists
if (!fs.existsSync(dataDirectory)) {
  fs.mkdirSync(dataDirectory, { recursive: true });
}

function saveDataToFile(data, filename) {
  fs.writeFile(path.join(dataDirectory, `${filename}.json`), JSON.stringify(data, null, 2), (err) => {
    if (err) {
      console.error(`Error writing file ${filename}:`, err);
    } else {
      console.log(`${filename}.json saved.`);
    }
  });
}

async function fetchAndSaveAllEntries(collection) {
  const allEntries = [];

  for (let id = 1; id <= collection.totalEntries; id++) {
    try {
      const response = await axios.get(`${API_URL}/api/${collection.name}/${id}`);

      if (response.status === 200) {
        const data = response.data;
        allEntries.push(data);
      } else {
        console.warn(`Unexpected status code ${response.status} for entry ID ${id} in ${collection.name}. Skipping...`);
      }
    } catch (error) {
      console.warn(`Error fetching entry with ID ${id} in ${collection.name}: ${error.message}. Skipping...`);
    }
  }

  saveDataToFile(allEntries, collection.name);
}

// Fetch and save data for each collection type
collectionTypes.forEach(collection => {
  fetchAndSaveAllEntries(collection);
});
