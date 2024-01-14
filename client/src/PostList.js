import React, { useState, useEffect } from "react";
import axios from "axios";
import CommentCreate from "./CommentCreate";
import CommentsList from "./CommentsList";

const PostList = () => {
  const [posts, setPosts] = useState({});

  const fetchPosts = async () => {
    await axios
      .get("http://localhost:4002/posts")
      .then((response) => {
        // console.log(response.data);
        setPosts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // console.log('post list: ', posts);
  const renderedPosts = Object.values(posts).map((post) => {
    return (
      <div
        className="card"
        style={{ width: "30%", marginBottom: "20px" }}
        key={post.id}
      >
        <div className="card-body">
            <h3>{post.title}</h3>
            <CommentsList comments={post.comments}></CommentsList>
            <CommentCreate postId={post.id}></CommentCreate>
        </div>

      </div>
    );
  });

  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {/* <h1>this is a post list.</h1> */}
      {/* {posts | json} */}
      {renderedPosts}
    </div>
  );
};

export default PostList;
