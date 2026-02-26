// Simple helper to connect Mongoose to MongoDB.
// It reads the database connection string from process.env.MONGO_URL
// and is called once in server.js before starting the HTTP server.

require("dotenv").config();
const mongoose = require("mongoose")
const url = process.env.MONGO_URL

const ConnectToDB = async () =>{
    await mongoose.connect(url)
};

module.exports = ConnectToDB