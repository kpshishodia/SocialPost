// import React from 'react'

// const CreatePost = () => {
//   return (
//     <section className='crete-post-section'>
// <h1>Create Post</h1>
// <form>
//     <input type="file" name="image" accept="image/*" />
//     <input type="text" name="caption" required />
//     <button type='submit'>Submit</button>
// </form>
//     </section>
//   )
// }

// export default CreatePost

import React, { useState } from "react";
import "./CreatePost.css";

const CreatePost = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [caption, setCaption] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image);
    formData.append("caption", caption);

    console.log("Submitting...");
    // later you will send this to backend using axios or fetch
  };

  return (
    <section className="create-post-section">
      <div className="create-post-card">
        <h1>Create Post</h1>

        <form onSubmit={handleSubmit}>
          <label className="upload-box">
            {preview ? (
              <img src={preview} alt="preview" className="preview-image" />
            ) : (
              <span>Click to upload image</span>
            )}
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              hidden
              required
            />
          </label>

          <input
            type="text"
            name="caption"
            placeholder="Write a caption..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            required
          />

          <button type="submit">Post</button>
        </form>
      </div>
    </section>
  );
};

export default CreatePost;