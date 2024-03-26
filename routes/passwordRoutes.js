const express = require('express');
const passwordRouter = express.Router();

const { generatePassword, checkPasswordLeak, decryptPassword, encryptPassword } = require('./../controllers/passwordController');

passwordRouter.post('/generate', generatePassword);
passwordRouter.post('/check-leak', checkPasswordLeak);
passwordRouter.post('/decrypt', decryptPassword);
passwordRouter.post('/encrypt', encryptPassword);

module.exports = passwordRouter;
