const express = require("express");
const { Post,User } = require('../../db/models');
const asyncHandler = require("express-async-handler");
const e = require("express");
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
        headerImage:req.headerImage,
        contentImage:req.contentImage,
        description:req.description,
        createdAt:new Date(),
        updatedAt: new Date()
    });
    res.statusCode = 201;
    res.json(createPost);
}))
//update a post


//delete a post
router.delete('/:id(\\d+)',asyncHandler(async(req,res) => {
    const deletePost = Post.findByPk(req.params);
    if(deletePost){
        deletePost.delete();
        res.json({Message:`Post ${req.params} deleted`});
    }else{
        res.status = "404";
        res.json({Message:`Delete Unsuccessful`});
    }
}))
module.exports = router;
