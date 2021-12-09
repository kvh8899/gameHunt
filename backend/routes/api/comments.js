const express = require("express");
const asyncHandler = require("express-async-handler");
const { Comment } = require("../../db/models");
const router = express.Router();

//update a comment
router.put(
  '/:commentId(\\d+)/edit',
  asyncHandler(async (req, res) => {
    const update = await Comment.update(
      {
        userId: req.body.userId,
        postId: req.body.postId,
        content: req.body.content,
      },
      {
        where: {
          id: req.params.commentId,
        },
      }
    );
    res.json(update);
  })
);

//delete a comment
router.delete('/:commentId(\\d+)',asyncHandler(async(req,res) => {
    const deleteItem = await Comment.findByPk(req.params.commentId);
    if(deleteItem){
        deleteItem.destroy();
        res.json({message:'Delete Successful'});
    }else{
        res.status = 404;
        res.json({message:'Unsuccessful Delete'})
    }

}))
module.exports = router;
