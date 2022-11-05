require("dotenv").config();
const mongoose = require("mongoose");
const DB_URL = process.env.DB_URL;

const connectDb = async () => {
  try {
    const db = await mongoose.connect(DB_URL);
    const { name, host } = db.connection;
    console.log(`Succesfully connected to db: ${name}`);
  } catch (error) {
    console.log("Error connecting to db:", error);
  }
};

module.exports = {
  connectDb,
  DB_URL,
};
