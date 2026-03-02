// import React, { useEffect, useState } from "react";
// import "./Feed.css";

// const Feed = () => {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchPosts = async () => {
//     try {
//       const res = await fetch("http://localhost:6001/feed");
//       const data = await res.json();
//       setPosts(data.posts);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching posts:", error);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   return (
//     <section className="feed-section">
//       <h1>Feed</h1>

//       {loading ? (
//         <p className="loading">Loading posts...</p>
//       ) : posts.length === 0 ? (
//         <p className="loading">No posts yet</p>
//       ) : (
//         <div className="feed-grid">
//           {posts.map((post) => (
//             <div key={post._id} className="post-card">
//               <img src={post.image} alt="post" />
//               <div className="post-content">
//                 <p>{post.caption}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </section>
//   );
// };

// export default Feed;


import React, { useEffect, useState } from "react";
import "./Feed.css";
import axios from "axios"

const Feed = () => {
  const [posts, setPosts] = useState([])
  

 useEffect(() => {

    axios.get("http://localhost:6001/feed")
      .then((res) => {
        console.log(res.data);

        // IMPORTANT: Update state
        setPosts(res.data.posts);
      })
      .catch((err) => {
        console.log("Error fetching feed:", err);
      });

  }, []);
  

  return (
    <section className="feed-section">
      <h1>Feed</h1>
{
    posts.length > 0 ? (
        posts.map((post) => (
            <div key = {post._id} className="post-card">
                <img src={post.image} alt={post.caption} />
                <p>{post.caption}</p>
            </div>
        ))
    ):(
        <h1>No posta available</h1>
    )
}
      
    </section>
  );
};

export default Feed;