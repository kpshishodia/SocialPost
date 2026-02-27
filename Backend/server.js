// Entry point for the backend API.
// Responsibilities:
// 1) Load environment variables from .env
// 2) Connect to MongoDB
// 3) Start the Express app on a given port
require("dotenv").config();
const app = require("./src/app")
const port = 6001 // HTTP port where the server listens
const ConnectToDB = require("./src/DB/db")

// Connect to MongoDB first, then start server
ConnectToDB()
    .then(() => {
        console.log("MongoDB Connected Successfully")
        app.listen(port, () => {
            console.log("Server running on port " + port)
        })
    })
    .catch((error) => {
        console.error("MongoDB Connection Failed:", error)
    })