// Service responsible only for talking to ImageKit.
// It receives a raw image Buffer, uploads it to ImageKit,
// and returns the full response from ImageKit (URL, fileId, etc.).

require("dotenv").config();
const ImageKit = require("@imagekit/nodejs")

// ImageKit client configured from environment variables.
// Make sure these are set in your .env file:
// - publicKey
// - privateKey
// - urlEndpoint
const imagekit = new ImageKit({
    publicKey: process.env.publicKey,
    privateKey: process.env.privateKey,
    urlEndpoint: process.env.urlEndpoint
})

// Uploads a single image buffer to ImageKit.
// The Express route passes req.file.buffer here.
async function uploadFile(buffer) {
    const result = await imagekit.files.upload({
        file: buffer.toString("base64"),
        fileName: "image.jpg"
    })
    return result
}

module.exports = uploadFile;