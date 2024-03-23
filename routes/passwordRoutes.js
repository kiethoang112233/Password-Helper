const express = require('express');
const passwordRouter = express.Router();

const { generatePassword, checkPasswordLeak, decryptPassword } = require('./../controllers/passwordController');

passwordRouter.post('/generate', generatePassword);
passwordRouter.post('/check-leak', checkPasswordLeak);
passwordRouter.post('/decrypt', decryptPassword)

module.exports = passwordRouter;
