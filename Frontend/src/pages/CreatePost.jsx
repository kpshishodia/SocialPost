

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./CreatePost.css";

const CreatePost = () => {

  // useNavigate is used to programmatically move to another route
  const navigate = useNavigate();

  // State to store selected image file
  const [image, setImage] = useState(null);

  // State to store preview URL of selected image
  const [preview, setPreview] = useState(null);


  // This function runs when user selects an image
  const handleImageChange = (e) => {

    // Get the first selected file
    const file = e.target.files[0];

    // If a file is selected
    if (file) {

      // Save the file in state
      setImage(file);

      // Create a temporary preview URL for showing image on UI
      // URL.createObjectURL converts file into viewable URL
      setPreview(URL.createObjectURL(file));
    }
  };


  // This function runs when form is submitted
  const handleSubmit = async (e) => {

    // Prevent page reload
    e.preventDefault();

    // If no image selected, stop submission
    if (!image) {
      alert("Please select an image");
      return;
    }

    // Create FormData object to send image + caption to backend
    const formData = new FormData();

    // Append image file
    formData.append("image", image);

    // Append caption value (taken directly from input field)
    formData.append("caption", e.target.caption.value);

    try {

      // Send POST request to backend
      await axios.post("http://localhost:6001/create-post", formData);

      // After successful post, redirect to feed page
      navigate("/feed");

    } catch (error) {

      // If error happens, log it
      console.log("Error creating post:", error);
    }
  };


  return (
    <section className="create-post-section">

      {/* Card container (styled by your CSS) */}
      <div className="create-post-card">

        <h1>Create Post</h1>

        {/* Form submission handled by handleSubmit */}
        <form onSubmit={handleSubmit}>
          
          {/* Upload Box (clickable area for image selection) */}
          <label className="upload-box">

            {/* If preview exists, show image */}
            {preview ? (
              <img
                src={preview}
                alt="preview"
                className="preview-image"
              />
            ) : (
              // Otherwise show placeholder text
              <span>Click to upload image</span>
            )}

            {/* Hidden file input */}
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              hidden
            />
          </label>

          {/* Caption Input */}
          <input
            type="text"
            name="caption"
            placeholder="Write a caption..."
            required
          />

          {/* Submit Button */}
          <button type="submit">Post</button>

        </form>
      </div>
    </section>
  );
};

export default CreatePost;