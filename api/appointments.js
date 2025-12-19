export default function handler(req, res) {
  res.status(200).json({
    envExists: !!process.env.MONGODB_URI,
    envValueStart: process.env.MONGODB_URI
      ? process.env.MONGODB_URI.substring(0, 15)
      : null
  });
}
