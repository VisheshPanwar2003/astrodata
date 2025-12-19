import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
let client;

export default async function handler(req, res) {
  try {
    if (!client) {
      client = new MongoClient(uri);
      await client.connect();
    }

    // List ALL databases visible to this URI
    const adminDb = client.db().admin();
    const dbs = await adminDb.listDatabases();

    // Read from your intended DB
    const db = client.db("mohit_raturi_db");
    const collections = await db.listCollections().toArray();
    const data = await db.collection("appointments").find({}).toArray();

    res.json({
      databases: dbs.databases.map(d => d.name),
      collections: collections.map(c => c.name),
      count: data.length,
      data
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
