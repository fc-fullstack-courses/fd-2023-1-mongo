const router = require('express').Router();
const authRouter = require('./authRouter');
const userRouter = require('./userRouter');
const messageController = require('../controllers/messages.controller');

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.get('/messages', messageController.getAllMessages);

module.exports = router;