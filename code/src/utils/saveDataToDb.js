// utils/saveDataToDb.js
async function saveDataToDb(data) {
    try {
      const response = await fetch('/api/saveData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data }),
      });
  
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error saving data:', error);
      throw error;
    }
  }
  
  export default saveDataToDb;
  