export default function handler(req, res) {
  res.json({
    envExists: !!process.env.MONGODB_URI
  });
}
