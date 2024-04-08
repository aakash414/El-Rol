// app.js
const express = require("express");
const app = express();
const routes = require("./routes/index.js");
const PORT = process.env.PORT || 3000;
const { Helia } = require("helia");
app.use(express.json());

routes(app);

const axios = require("axios");
const Web3 = require("web3");
const fs = require("fs");
const crypto = require("crypto");

// Function to calculate the SHA256 hash of a file
function calculateHash(filePath) {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash("sha256");
    const stream = fs.createReadStream(filePath);

    stream.on("data", (data) => hash.update(data));
    stream.on("end", () => resolve(hash.digest("hex")));
    stream.on("error", (error) => reject(error));
  });
}

// Connect to a Helia node
const helia = new Helia();
const j = strings(helia);

app.post("/addAccident", async (req, res) => {
  try {
    const { _loc, _date, _time, snapShot, _plate } = req.body;
    let _snapShot = await j.add(snapShot);
    _snapShot = _snapShot.toString();

    const result = await contract.call("addAccident", [
      _loc,
      _date,
      _time,
      _snapShot,
      _plate,
    ]);

    console.log(result);

    res.json({ success: true, result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post("/snapshot", async (req, res) => {
  try {
    const mlData = req.body.snapshotData;
    const imagePath = "path/to/your/image.jpg";

    // Calculate hash of the image
    const imageHash = await calculateHash(imagePath);

    // Add the image to Helia
    const imageCID = await helia.add(imagePath);

    // Processing data and interacting with smart contract
    // (Code from previous example using imageCID instead of IPFS content identifier)

    // Send success response
    res
      .status(200)
      .json({ success: true, message: "Data processed successfully" });
  } catch (error) {
    console.error("Error processing snapshot:", error);
    res
      .status(500)
      .json({ success: false, message: "Error processing snapshot" });
  }
});

// Define your routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
