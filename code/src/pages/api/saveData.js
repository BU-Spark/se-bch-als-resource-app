// pages/api/saveData.js
import nextConnect from 'next-connect';
import client from '../../../src/lib/mongodb'

async function saveData(req, res) {
  const { data } = req.body;

  try {
    await client.connect();
    const db = client.db(process.env.MONGODB_DB);
    const collection = db.collection('questionnaredata');

    const result = await collection.insertOne(data);
    res.status(200).json({ message: 'Data saved successfully', id: result.insertedId });
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ error: 'An error occurred while saving data' });
  } finally {
    await client.close();
  }
}

const handler = nextConnect();
handler.post(saveData);

export default handler;
