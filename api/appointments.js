import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI1;
let client;

export default async function handler(req, res) {
  try {
    if (!uri) {
      throw new Error("MongoDB URI missing");
    }

    if (!client) {
      client = new MongoClient(uri);
      await client.connect();
    }

    const db = client.db("websiteDB");
    const data = await db
      .collection("appointments")
      .find({})
      .toArray();

    res.status(200).json(data);
  } catch (err) {
    console.error("Mongo Error:", err);
    res.status(500).json({ error: err.message });
  }
}
