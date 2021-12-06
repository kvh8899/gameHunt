const express = require("express");
const { Post,User } = require('../../db/models');
const asyncHandler = require("express-async-handler");
const router = express.Router();



router.get('/',asyncHandler(async(req,res) => {
    const getPosts = await Post.findAll({
        limit:10,
    })
    res.json(getPosts);
}));

router.get('/:id(\\d+)',asyncHandler(async(req,res) => {
    const getPost = await Post.findByPk(req.params.id,{
        include:User,
        where:{
            id:req.params.id
        }
    });
    res.json(getPost);
}));
//create a post

router.post('/',asyncHandler(async(req,res) => {
    const createPost = await Post.create({
        userId:req.userId,
        header: req.header,
        subHeader:req.subHeader,
    })
}))
//update a post


//delete a post

module.exports = router;
