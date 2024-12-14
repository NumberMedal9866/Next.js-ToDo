import fs from "fs";
import path from "path";

export default function handler(req, res) {
  if (req.method === "GET") {
    const filePath = path.join(process.cwd(), "data.json"); // Path to the data.json file

    try {
      if (fs.existsSync(filePath)) {
        const fileContents = fs.readFileSync(filePath, "utf-8");
        const data = JSON.parse(fileContents);
        res.status(200).json(data); // Send JSON data as the response
      } else {
        res.status(404).json({ message: "data.json file not found" });
      }
    } catch (error) {
      console.error("Error reading data.json:", error);
      res.status(500).json({ message: "Error reading data.json" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
