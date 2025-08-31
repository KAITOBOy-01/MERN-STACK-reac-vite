const Post = require('../models/Post')

const getPost = async (req,res) => {
    try {
        const posts = await Post.find()
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const createPost = async (req,res) => {
    const post = req.body
    const newPost = new Post(post)
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
            const updatedPost = await Post.findByIdAndUpdate(
                id,
                { title, content },
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
            await Post.findByIdAndDelete(id)
            res.status(200).json({ message: 'Post deleted successfully' })
        }catch(error){
            res.status(404).json({ message: 'Post not found' })
        }
    }

module.exports = { getPost,createPost,updatePost,deletePost }