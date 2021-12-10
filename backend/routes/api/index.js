const express = require('express');
const apiRouter = express.Router();
const { setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');
const { requireAuth } = require('../../utils/auth.js');
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const postsRouter = require('./posts.js');
const commRouter = require('./comments.js');
const searchRouter = require('./search.js')
apiRouter.use('/session', sessionRouter);
apiRouter.use('/users', usersRouter);
apiRouter.use('/posts', postsRouter);
apiRouter.use('/comments',commRouter);
apiRouter.use('/search',searchRouter);

/*
 --- API TESTING CODE ---
apiRouter.post('/test',function(req, res) {
    res.json({ requestBody: req.body });
});



apiRouter.get('/set-token-cookie', asyncHandler(async (_req, res) => {
  const user = await User.findOne({
      where: {
        username: 'Demo-lition'
      }
    });
    console.log(user);
  setTokenCookie(res, user);
  return res.json({ user });
}));


apiRouter.get(
  '/require-auth',
  requireAuth,
  (req, res) => {
    return res.json(req.user);
  }
);
*/
module.exports = apiRouter;