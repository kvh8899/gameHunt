const express = require("express");
const { Post, User, Comment } = require("../../db/models");
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const router = express.Router();
const validatePost = [
  check("header")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a title"),
  check("subHeader")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a subHeader"),
  check("description")
    .exists({ checkFalsy: true })
    .isLength({ min: 10 })
    .withMessage("Please add a description of at least 10 Characters"),
  handleValidationErrors,
];
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const getPosts = await Post.findAll({
      limit: 10,
      order: [["createdAt", "DESC"]],
    });
    res.json(getPosts);
  })
);

router.get(
  "/:id(\\d+)",
  asyncHandler(async (req, res) => {
    let getPost = await Post.findByPk(req.params.id, {
      include: {
        model:Comment,
        include:User,
      },
      order:[[Comment,"createdAt","ASC"]],
    });
    const getUser = await Post.findByPk(req.params.id, {
        include: User
    });
    res.json([getPost,getUser]);
  })
);
//create a post

router.post(
  "/",
  validatePost,
  asyncHandler(async (req, res) => {
    const createPost = await Post.create({
      userId: req.body.userId,
      header: req.body.header,
      subHeader: req.body.subHeader,
      headerImage: req.body.headerImage,
      contentImage: req.body.contentImage,
      description: req.body.description,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    res.statusCode = 201;
    res.json(createPost);
  })
);
//update a post
router.patch(
  "/:id(\\d+)/edit",
  validatePost,
  asyncHandler(async (req, res) => {
    const update = await Post.update(
      {
        userId: req.body.userId,
        header: req.body.header,
        subHeader: req.body.subHeader,
        headerImage: req.body.headerImage,
        contentImage: req.body.contentImage,
        description: req.body.description,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.json(update);
  })
);

//delete a post
router.delete(
  "/:id(\\d+)",
  asyncHandler(async (req, res) => {
    const deletePost = await Post.findByPk(req.params.id);
    if (deletePost) {
      deletePost.destroy();
      res.json({ Message: `Post ${req.params} deleted` });
    } else {
      res.status = "404";
      res.json({ Message: `Delete Unsuccessful` });
    }
  })
);
//create a comment on a post
router.post(`/:postId/comments`,asyncHandler(async(req,res) => {
    const createComment = await Comment.create({
        userId:req.body.userId,
        postId:req.params.postId,
        content:req.body.comment
    })
    res.status = 201;
    res.json(createComment);
}))
module.exports = router;
