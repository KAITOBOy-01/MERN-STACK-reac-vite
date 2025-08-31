import React, { useState } from 'react'
import axios from 'axios'

function Form({ currentPost, setPosts, setCurrentPost }) {
    const [formData, setFormData] = useState({
        title: currentPost ? currentPost.title : '',
        content: currentPost ? currentPost.content : ''
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
         e.preventDefault()

        if (currentPost) {
            await axios.patch(`/posts/${currentPost._id}`, formData)
        } else {
            await axios.post('/posts', formData)
        }

        const { data } = await axios.get('/posts')
        setPosts(data)
        setFormData({ title: '', content: ''})
        setCurrentPost(null)
    }
  
    return (
    <form onSubmit={handleSubmit}>
        <input 
            name="title"
            type="text"
            placeholder='Title'
            value={formData.title}
            onChange={handleChange}
        />
        <br />
        <textarea 
            name="content"
            placeholder='Content'
            value={formData.content}
            onChange={handleChange}
        ></textarea>
        <br />
        <button type='submit'>{currentPost ? 'Update' : 'Create'}</button>
    </form>
  )
}

export default Form