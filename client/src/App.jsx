import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'

// Components 
import Form from './components/form'
import Posts from './components/Posts'

function App() {
  const [posts, setPosts] = useState([])
  const [currentPost, setCurrentPost] = useState(null)

  useEffect(() => {
    const fecthPosts = async () => {
      try{
        const { data } = await axios.get('/posts')
        setPosts(data)
      }catch (error){
        console.error("Error to fetcing post ...",error)
      }
    }
    fecthPosts()
  }, [])

  return (
    <div>
      <h1>MERN Stack App Testing</h1>
      <Form
        currentPost={currentPost}
        setPosts={setPosts}
        setCurrentPost={setCurrentPost}
      />
      <Posts
        posts={posts}
        setPosts={setPosts}
        setCurrentPost={setCurrentPost}
      />
    </div>
  )
}

export default App
