// pages/api/data.js
import nextConnect from 'next-connect';
import client from '../../lib/mongodb';

async function fetchData(req, res) {
  try {
    await client.connect();
    const db = client.db(process.env.MONGODB_DB);
    const collection = db.collection('questionnaredata');

    const data = await collection.find({}).toArray();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'An error occurred while fetching data' });
  } finally {
    await client.close();
  }
}

const handler = nextConnect();
handler.get(fetchData);

export default handler;
