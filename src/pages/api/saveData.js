import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      console.log("Request received:", req.body);

      const { data } = req.body;

      if (!data || typeof data !== "string") {
        console.error("Invalid data:", data);
        return res.status(400).json({ message: "Invalid input data" });
      }

      const filePath = path.join(process.cwd(), "public", "data.json");
      console.log("File Path:", filePath);


      // Read existing data
      let tasks = [];
      if (fs.existsSync(filePath)) {
        const fileContents = fs.readFileSync(filePath, "utf-8");
        console.log("File contents:", fileContents);
        tasks = JSON.parse(fileContents);
      }

      // Add the new task
      const newTask = { id: Date.now(), value: data };
      tasks.push(newTask);

      // Write back to the file
      fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2), "utf-8");

      console.log("Task added successfully:", newTask);
      return res.status(200).json({ message: "Task added", newTask });
    }

    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (error) {
    console.error("Error in saveData API route:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
