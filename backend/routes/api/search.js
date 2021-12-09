const express = require("express");
const asyncHandler = require("express-async-handler");
const { UPSERT } = require("sequelize/types/lib/query-types");
const { Post, User } = require("../../db/models");
const router = express.Router();

router.get(
  "/posts/search",
  asyncHandler(async (req, res) => {
    const search = Post.findAll({
      include: Comment,
      limit: 10,
      order: [["createdAt", "DESC"]],
      where: {
        [Op.or]: [
          {
            header: {
              [Op.substring]: {
                [Op.or]: [req.body.input],
              },
            },
          },
          {
            subHeader: {
              [Op.substring]: {
                [Op.or]: [req.body.input],
              },
            },
          },
        ],
      },
    });
    res.json(search);
  })
);

module.exports = router;
