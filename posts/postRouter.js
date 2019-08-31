const router = require('express').Router();
const Post = require('./postSchema')

//retrieves all posts
router.get('/posts', async (req, res) => {
    const posts = await Post.find({})
    .lean()
    .exec()
    res.status(200).json(posts)
})

//retrieves a single post by id
router.get('/post/:id', async (req, res) => {
    const postId = req.params.id
    try{
        const post = await Post.findById(postId)
        .lean()
        .exec()
        res.status(200).json(post)
    }
    catch{
        res.status(404).json({message: 'The post with this ID does not exist'})
    }
})

//creates posts 
router.post('/posts', async (req, res) => {
    const createdPost = req.body
    try{
        const post = await Post.create(createdPost)
        res.status(201).json(post.toJSON())
    }
    catch{
        res.status(500).json({message: 'There was an error creating the post'})
    }
})

module.exports = router