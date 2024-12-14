import fs from "fs";
import path from "path";

export default function handler(req, res) {
  if (req.method === "POST") {
    const { data } = req.body;

    if (!data || typeof data !== "string") {
      return res.status(400).json({ message: "Invalid input data" });
    }

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

      // Read the current data
      const fileContents = fs.readFileSync(filePath, "utf-8");
      const tasks = JSON.parse(fileContents);

      // Add the new task
      const newTask = { id: Date.now(), value: data };
      tasks.push(newTask);

      // Write the updated data back to the file
      fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2), "utf-8");

      return res.status(200).json({ message: "Task added", newTask });
    } catch (error) {
      console.error("Error saving task:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
