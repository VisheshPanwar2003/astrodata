export default function handler(req, res) {
  res.status(200).json({
    status: "API is working",
    envKeys: Object.keys(process.env)
  });
}
