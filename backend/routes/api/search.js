const express = require("express");
const asyncHandler = require("express-async-handler");
const { Post, User ,Comment} = require("../../db/models");
const router = express.Router();
const {Op} = require("sequelize")
router.get(
  "/posts",
  asyncHandler(async (req, res) => {
    const search = await Post.findAll({
      include: Comment,
      limit: 10,
      order: [["createdAt", "DESC"]],
      where: {
          header:{
            [Op.or]:[{[Op.substring]:req.query.input}]
          }
      }
    });
    res.json(search);
  })
);

module.exports = router;
