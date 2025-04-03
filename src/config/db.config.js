require("dotenv").config({ path: "./.env" });
const mongoose = require("mongoose");
const { mongoUrl } = require("./server.config");

async function connectToDB() {
  try {
    await mongoose.connect(mongoUrl);
    console.log("Connected to DB");
  } catch (error) {
    console.log('err in DB connection', error);
  }
}

module.exports = connectToDB