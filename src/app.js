// Importing required modules
const express = require("express")           // Express framework for building APIs
const multer = require("multer")
const app = express()     
const upload = multer({storage: multer.memoryStorage()})
const uploadFile = require("./services/storage.service")

// Middleware to parse JSON body from client requests
app.use(express.json()); 

app.post("/create-post", upload.single("image"), async (req, res) => {
    try {
        console.log("Body:", req.body)
        console.log("File:", req.file)

       

        if (!req.file) {
            return res.status(400).json({ message: "Image is required" })
        }

         const result = await uploadFile(req.file.buffer)
        console.log(result)

        res.status(200).json({
            message: "API working successfully",
            fileName: req.file.originalname
        })

    } catch (error) {
        res.status(500).json({ message: "Something went wrong" })
    }
})

module.exports = app;
