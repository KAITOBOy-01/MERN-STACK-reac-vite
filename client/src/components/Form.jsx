import React, { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'

function Form({ currentPost, setPosts, setCurrentPost }) {
    const [formData, setFormData] = useState({
        title: currentPost ? currentPost.title : '',
        content: currentPost ? currentPost.content : ''
    })
    const [file, setFile] = useState(null)

    // Reload Component and Set Form
    useEffect(()=> {
        if(currentPost) {
            setFormData({
                title: currentPost.title,
                content: currentPost.content
            })
        } else {
            setFormData({
                title: '',
                content: ''
            })
        }
    }, [currentPost])


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const handleFileChange = (e) => {
        setFile(e.target.files[0])
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = new FormData()
        data.append('title', formData.title)
        data.append('content', formData.content)

        if (file) {
            data.append('image', file)
        }

        try {
            if (currentPost) {
                await axios.patch(`/posts/${currentPost._id}`, data)
            } else {
                await axios.post('/posts', data)
            }

            const { data: updatePosts } = await axios.get('/posts')
            setPosts(updatePosts)
            setFormData({ title: '', content: '' })
            setFile(null)
            setCurrentPost(null)


        } catch (error) {
            console.error("Error to submitting post")
        }

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
            {currentPost && currentPost.image && (
                <img src={`http://localhost:5000/images/${currentPost.image}`} alt='Current' style={{width: '100px'}}/>
            )}
            <br />
            <input type="file" name='image' onChange={handleFileChange} />
            <br />
            <button type='submit'>{currentPost ? 'Update' : 'Create'}</button>
        </form>
    )
}

export default Form