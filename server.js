require("dotenv").config();
const app = require("./src/app")
const port = 6001
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