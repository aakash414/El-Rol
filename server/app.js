// app.js
import express from "express";
import bodyParser from "body-parser";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import cors from "cors";
import { createHelia } from "helia";
import { strings } from "@helia/strings";
import { json } from "@helia/json";
import dotenv from "dotenv";
dotenv.config();

const app = express();
import routes from "./routes/index.js";
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
routes(app);
app.use(bodyParser.json());

// const axios = require("axios");
// const Web3 = require("web3");
// const fs = require("fs");
// const crypto = require("crypto");

// Function to calculate the SHA256 hash of a file
// function calculateHash(filePath) {
//   return new Promise((resolve, reject) => {
//     const hash = crypto.createHash("sha256");
//     const stream = fs.createReadStream(filePath);

//     stream.on("data", (data) => hash.update(data));
//     stream.on("end", () => resolve(hash.digest("hex")));
//     stream.on("error", (error) => reject(error));
//   });
// }

// Connect to a Helia node
// const helia = new Helia();
// const j = strings(helia);

const helia = await createHelia();
const j = strings(helia);
console.log("private_key", process.env.PRIVATE_KEY);
const sdk = ThirdwebSDK.fromPrivateKey(
  `0x${process.env.PRIVATE_KEY}`,
  "sepolia",
  {
    secretKey: process.env.SECRET_KEY,
  }
);

let contract;

(async () => {
  try {
    contract = await sdk.getContract(process.env.CONTRACT_ADDRESS);
  } catch (error) {
    console.error("Error fetching contract:", error);
    process.exit(1); // Exit the server on contract fetch error
  }
})();

app.post("/addAccident", async (req, res) => {
  try {
    const { _loc, _date, _time, _registrationNumber, _hashLink } = req.body;

    const result = await contract.call("addAccident", [
      _loc,
      _date,
      _time,
      _registrationNumber,
      _hashLink,
    ]);

    console.log(result);

    res.json({ success: true, result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
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
