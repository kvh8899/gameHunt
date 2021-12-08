const express = require('express');
const asyncHandler = require("express-async-handler");
const router = express.Router();
const {Comment,Post,User} = require('../../db/models')
//get a posts comments
router.get('/:postId/comments',asyncHandler((req,res) => {
    const postComments = await Post.findAll({
        where:{
            postId: req.params.postId
        },
        include:{
           model:User 
        }
    });
    res.json(postComments);
}));