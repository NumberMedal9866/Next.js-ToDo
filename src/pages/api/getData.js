import fs from "fs";
import path from "path";

export default function handler(req, res) {
  if (req.method === "GET") {
    // Define the file path
    const filePath =
      process.env.NODE_ENV === "production"
        ? "/tmp/data.json" // Writable in production
        : path.join(process.cwd(), "data.json"); // Local for development

    try {
      // Ensure the file exists
      if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify([])); // Initialize an empty array
      }

      // Read the file
      const fileContents = fs.readFileSync(filePath, "utf-8");
      const tasks = JSON.parse(fileContents);

      return res.status(200).json(tasks);
    } catch (error) {
      console.error("Error reading data:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
