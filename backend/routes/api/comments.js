const express = require("express");
const asyncHandler = require("express-async-handler");
const { Comment } = require("../../db/models");
const router = express.Router();

//update a comment
router.put(
  '/:commentId(\\d+)',
  asyncHandler(async (req, res) => {
    await Comment.update(
      {
        userId: req.body.userId,
        postId: req.body.postId,
        content: req.body.content,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        where: {
          id: req.params.commentId,
        },
      }
    );
  })
);

//delete a comment
router.delete('/:commentId(\\d+)',asyncHandler(async(req,res) => {
    const deleteItem = await Comment.findByPk(req.body.params);
    if(deleteItem){
        deleteItem.destroy();
        res.json({message:'Delete Successful'});
    }else{
        res.status = 404;
        res.json({message:'Unsuccessful Delete'})
    }

}))
module.exports = router;
