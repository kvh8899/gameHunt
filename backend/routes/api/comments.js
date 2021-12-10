const express = require("express");
const asyncHandler = require("express-async-handler");
const { Comment } = require("../../db/models");
const router = express.Router();

//update a comment
router.put(
  '/:commentId(\\d+)/edit',
  asyncHandler(async (req, res) => {
      let updated = {
        userId: req.body.userId,
        postId: req.body.postId,
        content: req.body.content,
        createdAt: req.body.createdAt,
        updatedAt: new Date()
      }
    const update = await Comment.update(
      updated,
      {
        where: {
          id: req.params.commentId,
        },
      }
    );
    res.json(updated);
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
