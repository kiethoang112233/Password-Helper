const express = require('express');
const router = express.Router();

const authRouter = require('./authRoutes.js');
const passwordRouter = require('./passwordRoutes.js');
const credentialRouter = require('./credentialRoutes.js');
const requireAuth = require('../middlewares/requireAuth');

//Requires JWT to access these APIs
router.use(['/credential', '/password'], requireAuth);

router.use('/auth', authRouter);
router.use('/password', passwordRouter);
router.use('/credential', credentialRouter);

module.exports = router;