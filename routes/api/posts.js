const express = require('express');
const router = express.Router();

const authmw = require('../../middleware/authmw');
const Post = require('../../mongodb/postModel');

//post request to /api/post
router.post('/' , authmw , (req , res)=>{
    const { title , body , postedBy } = req.body;
    if(!title || !body || !postedBy){
        res.status(400).json({error : "Please enter all fields"});
    };

    const newPost = new Post({
        title,
        body,
        postedBy
    });

    newPost.save().then(x=>{
        res.status(200).json(x)
    }).catch(err=>console.log(err))
    
});

//get all data at /api/post
router.get('/' , (req , res)=>{
    Post.find()
        .sort({createdAt : -1})
        .then(x =>res.status(200).json(x))
        .catch(err=>console.log(err))
});

module.exports = router;