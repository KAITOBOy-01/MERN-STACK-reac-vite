import React from 'react'
import axios from 'axios'

function Posts({ posts, setPosts, setCurrentPost }) {

    const handleDelete = async (id) => {
      await axios.delete(`/posts/${id}`)
      const { data } = await axios.get('/posts')
      setPosts(data)
    }

  return (
    <div>
      <h2>Posts</h2>
      {posts.map(post => (
        <div key={post._id} style={{ border: '1px solid #ccc', padding: '10px 0', margin: '10px 0' }}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          {post.image && (
            <img src={`http://localhost:5000/images/${post.image}`} alt={post.title} style={{ width: '100%' , maxWidth: '300px'}}/>
          )}
          <br />
          <button onClick={() => setCurrentPost(post)}>Edit</button>
          <button onClick={() => handleDelete(post._id)}>Delete</button>
        </div>
      ))}
    </div>
  )
}

export default Posts
