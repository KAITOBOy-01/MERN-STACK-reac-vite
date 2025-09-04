const express = require('express')
const upload = require('../controller/upload')


const { 
    getPost,
    createPost,
    updatePost,
    deletePost
} = require('../controller/posts')

const router = express.Router()

router.get('/',getPost)
router.post('/',upload.single('image'),createPost)
router.patch('/:id',upload.single('image'), updatePost)
router.delete('/:id',deletePost)

module.exports = router