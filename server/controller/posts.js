const Post = require('../models/Post')
const fs = require('fs')

const getPost = async (req,res) => {
    try {
        const posts = await Post.find()
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const createPost = async (req,res) => {
    const { title, content } = req.body
    const image = req.file ? req.file.filename : null
    const newPost = new Post({ title, content , image })
    try{
        await newPost.save()
        res.status(201).json(newPost)
    }catch(error) {
        res.status(409).json({ message: error.message })
    }
}
    const updatePost = async (req,res) => {
        const { id } = req.params
        const { title, content } = req.body
        try {
            const posToUpdate = await Post.findById(id)

            const image = req.file ? req.file.filename : posToUpdate.image

            const updatedPost = await Post.findByIdAndUpdate(
                id,
                { title, content , image },
                { new: true }
            )
            res.status(200).json(updatedPost)
        }catch(error) {
            res.status(404).json({ message: 'Post not found' })
        }
    }

    const deletePost = async (req,res) => {
        const { id } = req.params
        try{
            const postToDelete = await Post.findById(id)

            if(postToDelete) {
                const imagePath = `public/images/${postToDelete.image}`

                fs.unlink(imagePath, (err) => {
                    if(err) {
                        console.error("Failed to Delete image from file:")
                    }
                })
            }

            await Post.findByIdAndDelete(id)
            res.status(200).json({ message: 'Post deleted successfully' })
        }catch(error){
            res.status(404).json({ message: 'Post not found' })
        }
    }

module.exports = { getPost,createPost,updatePost,deletePost }