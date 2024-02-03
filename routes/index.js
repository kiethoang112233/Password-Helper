const express = require('express');
const router = express.Router();

const authRouter = require('./authRoutes.js');
const passwordRouter = require('./passwordRoutes.js');
const requireAuth = require('../middlewares/requireAuth');

//Requires JWT to access these APIs
router.use(['/boards', '/tasks', '/users'], requireAuth);

router.use('/auth', authRouter);
router.use('/password', passwordRouter);

module.exports = router;