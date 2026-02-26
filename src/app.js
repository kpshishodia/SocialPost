// High-level idea:
// This file creates a small Express app with one endpoint that:
// 1) accepts text + an image file from the client,
// 2) uploads the image to ImageKit using a helper service,
// 3) sends a simple JSON response back.

// Importing required modules
const express = require("express")           // Express framework for building APIs
const multer = require("multer")
const app = express()     

// Multer setup:
// - memoryStorage keeps the uploaded file in RAM as a Buffer (no file written to disk)
// - upload.single("image") will put the uploaded file on req.file
const upload = multer({storage: multer.memoryStorage()})
const uploadFile = require("./services/storage.service")

// Middleware to parse JSON body from client requests
app.use(express.json()); 

// Route: create a new post with an image
// Flow inside this handler:
// 1) Read form fields from req.body (e.g. caption)
// 2) Read the uploaded image buffer from req.file
// 3) Upload the image buffer to ImageKit via uploadFile()
// 4) Return a success JSON response (for now we just echo basic info)
app.post("/create-post", upload.single("image"), async (req, res) => {
    try {
        console.log("Body:", req.body)
        console.log("File:", req.file)

        // Basic validation: make sure an image file was actually sent
        if (!req.file) {
            return res.status(400).json({ message: "Image is required" })
        }

        // Upload the raw image buffer to ImageKit and wait for the result
        const result = await uploadFile(req.file.buffer)
        console.log(result)

        // For now we only send back a simple success message and original file name.
        // You could also save result.url + caption to MongoDB using the Post model.
        res.status(200).json({
            message: "API working successfully",
            fileName: req.file.originalname
        })

    } catch (error) {
        // Catch any unexpected error (ImageKit, validation, etc.) and send 500
        res.status(500).json({ message: "Something went wrong" })
    }
})

module.exports = app;
