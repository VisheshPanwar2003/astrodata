import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
let client;

export default async function handler(req, res) {
  try {
    if (!client) {
      client = new MongoClient(uri);
      await client.connect();
    }

    // ✅ MUST MATCH ATLAS EXACTLY
    const db = client.db("mohit_raturi_db");
    const data = await db
      .collection("appointments")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    res.status(200).json(data);
  } catch (err) {
    console.error("Mongo Error:", err);
    res.status(500).json({ error: err.message });
  }
}
