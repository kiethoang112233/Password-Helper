const express = require('express');
const passwordRouter = express.Router();

const { generatePassword, checkPasswordLeak } = require('./../controllers/passwordController');

passwordRouter.post('/generate', generatePassword);
passwordRouter.post('/check-leak', checkPasswordLeak);

module.exports = passwordRouter;