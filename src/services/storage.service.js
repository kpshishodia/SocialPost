
require("dotenv").config();
const ImageKit = require("@imagekit/nodejs")

const imagekit = new ImageKit({
    publicKey: process.env.publicKey,
    privateKey: process.env.privateKey,
    urlEndpoint: process.env.urlEndpoint
})

async function uploadFile(buffer) {
    const result = await imagekit.files.upload({
        file: buffer.toString("base64"),
        fileName: "image.jpg"
    })
    return result
}

module.exports = uploadFile;