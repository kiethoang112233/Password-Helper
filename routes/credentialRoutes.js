const express = require('express');
const credentialRouter = express.Router();

const { getCredential, getCredentials, updateCredential, createCredential, deleteCredential } = require('../controllers/credentialController');

/**
 * Routes handling Board related operations
 */

credentialRouter.get('/', getCredentials);
credentialRouter.get('/:id', getCredential);
credentialRouter.post('/create', createCredential);
credentialRouter.patch('/:id', updateCredential);
credentialRouter.delete('/:id', deleteCredential);

module.exports = credentialRouter;