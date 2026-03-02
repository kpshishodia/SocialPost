

import React, { useEffect, useState } from "react";
import "./Feed.css";
import axios from "axios";

const Feed = () => {

  // State to store posts from backend
  const [posts, setPosts] = useState([]);

  // State to handle loading UI
  const [loading, setLoading] = useState(true);


  // Runs once when component mounts
  useEffect(() => {

    // Async function to fetch posts
    const fetchPosts = async () => {
      try {

        // Send GET request to backend
        const res = await axios.get("http://localhost:6001/feed");

        console.log("Feed Data:", res.data);

        // Store posts array from backend response
        setPosts(res.data.posts);

      } catch (error) {

        console.log("Error fetching feed:", error);

      } finally {

        // Stop loading after request completes
        setLoading(false);
      }
    };

    fetchPosts();

  }, []); // Empty dependency array → run only once


  return (
    <section className="feed-section">

      <h1>Feed</h1>

      {/* Show loading text while fetching data */}
      {loading && <p className="loading">Loading posts...</p>}

      {/* If not loading and no posts found */}
      {!loading && posts.length === 0 && (
        <p className="loading">No posts available</p>
      )}

      {/* Grid container for posts */}
      {!loading && posts.length > 0 && (
        <div className="feed-grid">

          {posts.map((post) => (
            <div key={post._id} className="post-card">

              {/* Post Image */}
              <img
                src={post.image}
                alt={post.caption}
              />

              {/* Caption Section */}
              <div className="post-content">
                <p>{post.caption}</p>
              </div>

            </div>
          ))}

        </div>
      )}

    </section>
  );
};

export default Feed;