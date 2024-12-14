import fs from "fs";
import path from "path";

export default function handler(req, res) {
  if (req.method === "POST") {
    const { data } = req.body; // Extract the input data

    if (!data || typeof data !== "string") {
      return res.status(400).json({ message: "Invalid input data" });
    }

    // Define the path to the data.json file
    const filePath = path.join(process.cwd(), "data.json");

    try {
      // Read the existing JSON data
      let jsonData = [];
      if (fs.existsSync(filePath)) {
        const fileContents = fs.readFileSync(filePath, "utf-8");
        jsonData = JSON.parse(fileContents);
      }

      // Add the new task to the JSON array
      const newTask = { id: Date.now(), value: data };
      jsonData.push(newTask);

      // Write the updated data back to the file
      fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), "utf-8");

      console.log("Data written successfully:", filePath);

      return res.status(200).json({ message: "Data saved successfully", newTask });
    } catch (error) {
      console.error("Error writing to file:", error);
      return res.status(500).json({ message: "Failed to save data", error });
    }
  }

  // Handle unsupported methods
  res.setHeader("Allow", ["POST"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
