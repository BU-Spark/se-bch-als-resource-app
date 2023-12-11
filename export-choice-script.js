const axios = require('axios');
const fs = require('fs');
const path = require('path');

const API_URL = 'your-ip-address/api/choice-to-question-maps';
const dataDirectory = './Strapi_Content_and_structure_example';

// Check if the directory exists, and create it if not
if (!fs.existsSync(dataDirectory)) {
  fs.mkdirSync(dataDirectory, { recursive: true });
}

function saveDataToFile(data, filename) {
    // Ensure filename ends with '.json'
    const outputFilename = filename.endsWith('.json') ? filename : `${filename}.json`;
  
    fs.writeFile(path.join(dataDirectory, outputFilename), JSON.stringify(data, null, 2), (err) => {
      if (err) {
        console.error(`Error writing file ${outputFilename}:`, err);
      } else {
        console.log(`${outputFilename} saved.`);
      }
    });
  }
  

// Fetch and save all entries
async function fetchAndSaveAllEntries() {
  const allEntries = [];
  const totalEntries = 89; // Hardcoded total entries

  for (let id = 2; id <= totalEntries; id++) {
    try {
      const response = await axios.get(`${API_URL}/${id}`);

      if (response.status === 200) {
        const data = response.data;
        allEntries.push(data); // Add data to the allEntries array
      } else {
        console.warn(`Unexpected status code ${response.status} for entry ID ${id}. Skipping...`);
      }
    } catch (error) {
      console.warn(`Error fetching entry with ID ${id}: ${error.message}. Skipping...`);
    }
  }

  // Remove meta field from each entry
  const entriesWithoutMeta = allEntries.map((entry) => {
    return {
      data: entry.data,
    };
  });

  // Create metadata object
  const metadata = {
    totalEntries: totalEntries,
    // Add additional metadata properties here
  };

  // Save data to file with metadata
  saveDataToFile({ entries: entriesWithoutMeta, metadata }, 'choice-to-question-maps.json');
}

fetchAndSaveAllEntries();
