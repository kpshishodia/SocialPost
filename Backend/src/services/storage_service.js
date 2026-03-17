// Service responsible only for talking to ImageKit.
// Why we use an external service (ImageKit):
// - It stores and serves images from a fast CDN.
// - It can optimize images (resize, compress, transform URLs, etc.).
// - This keeps our Node.js server light; we don't store images on local disk.
//
// Responsibility of this file:
// - Receive a raw image Buffer from the route handler.
// - Convert it to a format ImageKit expects.
// - Call ImageKit's SDK to upload the file.
// - Return the full response (including URL, fileId, etc.) to the caller.

require("dotenv").config();

// Import the official ImageKit Node.js SDK.
// "@imagekit/nodejs" is the package that exposes the ImageKit constructor.
const ImageKit = require("@imagekit/nodejs")

// ImageKit client configured from environment variables.
// Why env variables?
// - Keys should stay secret and not be hard‑coded in the codebase.
// - Different environments (dev, staging, prod) can have different keys.
//
// Make sure these are set in your .env file:
// - publicKey    => public identifier (safe to expose on frontend usually)
// - privateKey   => secret key (NEVER expose to frontend; only backend uses this)
// - urlEndpoint  => base URL from which ImageKit serves your images
//
// Syntax breakdown:
//   const imagekit = new ImageKit({ ...config })
//   - "new ImageKit(...)" creates a client instance that knows how to talk
//     to ImageKit's servers using your account's credentials.
const imagekit = new ImageKit({
    publicKey: process.env.publicKey,
    privateKey: process.env.privateKey,
    urlEndpoint: process.env.urlEndpoint
})

// Uploads a single image buffer to ImageKit.
// The Express route passes req.file.buffer here.
//
// Why async?
// - Uploading a file is an I/O operation (network request).
// - We use async/await to wait for ImageKit to finish the upload.
//
// Function signature:
//   async function uploadFile(buffer)
//   - "buffer" is a Node.js Buffer that contains the raw binary data of the image.
async function uploadFile(buffer) {
    // imagekit.files.upload(options) is the core method from the SDK.
    //
    // We must send:
    // - file:      the actual image data, in Base64 string format.
    //              buffer.toString("base64") converts the binary Buffer into a Base64 string.
    // - fileName:  the name that will appear in ImageKit (can be any string).
    //
    // Syntax:
    //   imagekit.files.upload({
    //       file: "<base64-string>",
    //       fileName: "image.jpg"
    //   })
    //
    // "await" pauses here until the upload is finished and we get a response.
    const result = await imagekit.files.upload({
        file: buffer.toString("base64"),
        fileName: "image.jpg"
    })

    // "result" typically includes fields like:
    // - result.url     => public URL of the uploaded image
    // - result.fileId  => ImageKit's internal ID for this file
    // - result.name    => file name
    // and more metadata.
    return result
}

// We export uploadFile so other files (like src/app.js) can call it.
module.exports = uploadFile;