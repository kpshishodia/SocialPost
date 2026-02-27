import React, { useEffect, useState } from "react";
import "./Feed.css";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const res = await fetch("http://localhost:6001/feed");
      const data = await res.json();
      setPosts(data.posts);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <section className="feed-section">
      <h1>Feed</h1>

      {loading ? (
        <p className="loading">Loading posts...</p>
      ) : posts.length === 0 ? (
        <p className="loading">No posts yet</p>
      ) : (
        <div className="feed-grid">
          {posts.map((post) => (
            <div key={post._id} className="post-card">
              <img src={post.image} alt="post" />
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