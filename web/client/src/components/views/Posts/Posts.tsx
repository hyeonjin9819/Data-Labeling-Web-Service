import React from 'react';

const Posts = ({posts}:any) => {
  return (
    <>
 
  <ul>
    { posts.map((post: { id: any, title: any })=>(
      <li key={post.id}>
        {post.title}
      </li>
    ))}
  </ul>
  </>
  );
};
export default Posts;
