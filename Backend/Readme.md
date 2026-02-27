## SocialPost – Simple Image Post API

**SocialPost** is a small Node.js + Express backend that lets you create a post with an image.  
The image is uploaded to **ImageKit**, and the service is ready to be extended with MongoDB storage for posts.

---

### Tech Stack

- **Runtime**: Node.js
- **Framework**: Express
- **Database**: MongoDB (via Mongoose)
- **File Upload**: Multer (memory storage)
- **Image CDN**: ImageKit
- **Environment Management**: dotenv

---

### Project Structure

```text
SocialPost/
├── src/
│   ├── app.js                # Express app + /create-post route
│   ├── DB/
│   │   └── db.js             # MongoDB connection helper (Mongoose)
│   ├── models/
│   │   └── post.model.js     # Post schema (image + caption)
│   └── services/
│       └── storage.service.js # ImageKit upload service
├── server.js                 # App entry point (starts server + DB)
├── package.json
├── package-lock.json
├── .env                      # Environment variables (not committed)
└── Readme.md
```

---

### How the Flow Works (High Level)

1. **Client** sends a `POST /create-post` request as `multipart/form-data`  
   - Field `image`: the image file  
   - Optional text fields, like `caption`, go in `req.body`
2. **Multer** (`memoryStorage`) reads the uploaded file and puts it on `req.file`.
3. The route in `src/app.js` calls `uploadFile(buffer)` from `storage.service.js`.
4. `uploadFile` sends the image Buffer to **ImageKit** and gets the upload result.
5. The API responds with a simple success JSON.  
   (You can later save `result.url` + `caption` into MongoDB using `post.model.js`.)

---

### Setup

1. **Install dependencies**

```bash
npm install
```

2. **Create a `.env` file** in the project root:

```text
MONGO_URL=your-mongodb-connection-string
publicKey=your-imagekit-public-key
privateKey=your-imagekit-private-key
urlEndpoint=your-imagekit-url-endpoint
```

> Keep this file private. It should **not** be committed to git.

---

### Running the Server

By default, the server listens on **port 6001** (see `server.js`).

```bash
npm start
```

You should see logs like:

- `MongoDB Connected Successfully`
- `Server running on port 6001`

---

### API – Create Post

- **Method**: `POST`  
- **URL**: `http://localhost:6001/create-post`  
- **Content-Type**: `multipart/form-data`

**Form fields:**

- **image**: required, the image file
- **caption**: optional, text caption for the image

**Example (using curl):**

```bash
curl -X POST http://localhost:6001/create-post \
  -F "image=@/path/to/your-image.jpg" \
  -F "caption=My first social post"
```

**Sample success response:**

```json
{
  "message": "API working successfully",
  "fileName": "your-image.jpg"
}
```

Later, you can:

- Save the ImageKit URL + caption to MongoDB via `post.model.js`
- Add more routes for listing posts, deleting posts, authentication, etc.