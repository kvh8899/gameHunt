const express = require('express');
const apiRouter = express.Router();
const asyncHandler = require('express-async-handler');
const { setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');
const { requireAuth } = require('../../utils/auth.js');
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');

apiRouter.use('/session', sessionRouter);

apiRouter.use('/users', usersRouter);

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