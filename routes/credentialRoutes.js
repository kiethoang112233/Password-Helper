const express = require('express');
const credentialRouter = express.Router();

const { getCredential, getCredentials, updateCredential, createCredential, deleteCredential } = require('../controllers/credentialController');

/**
 * Routes handling Board related operations
 */

boardRouter.get('/', getCredentials);
boardRouter.get('/:id', getCredential);
boardRouter.post('/create', createCredential);
boardRouter.patch('/:id', updateCredential);
boardRouter.delete('/:id', deleteCredential);

module.exports = credentialRouter;