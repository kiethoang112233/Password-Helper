const Credential = require('../models/credentialModel');
const { successRes } = require('../models/responseModels/successResponse');
const AppError = require("../utils/appError");
const { errorDescription, errorMessage, successMessage } = require('../utils/const');
const Cryptr = require('cryptr');

/**
 *  Delete A Credential
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
exports.deleteCredential = async (req, res, next) => {
    try {
        const deleteCredential = await Credential.findByIdAndDelete(req.params.id);

        if (!deleteCredential) {
            return next(new AppError(404, errorDescription.unableDelete, errorMessage.unableDelete), req, res, next);
        }

        res
            .status(200)
            .json(successRes(successMessage.credentialDeleted, 200, { id: deleteCredential.id }));

    } catch (error) {
        next(error);
    }
};

/**
 *  Update Credential info
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
exports.updateCredential = async (req, res, next) => {
    try {

        const updateCredential = await Credential.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!updateCredential) {
            return next(new AppError(404, errorDescription.unableUpdate, errorMessage.unableUpdate), req, res, next);
        }

        res
            .status(200)
            .json(successRes(successMessage.credentialUpdated, 200, { id: updateCredential.id }));

    } catch (error) {
        next(error);
    }
};

/**
 *  Create a new Credential
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
exports.createCredential = async (req, res, next) => {
    try {

        // encrypt password using secret key
        let secretKey = req.body.secretKey.trim();

        const cryptr = new Cryptr(secretKey);
        const encryptedPassword = cryptr.encrypt(req.body.password);

        //Creating Credential + save only the encrypted password to DB
        const createCredential = await Credential.create({
            userId: req.user.id,
            platform: req.body.platform,
            username: req.body.username,
            password: encryptedPassword,
        });

        if (!createCredential) {
            return next(new AppError(404, errorDescription.unableCreate, errorMessage.unableCreate), req, res, next);
        }

        res
            .status(200)
            .json(successRes(successMessage.credentialCreated, 200, { id: createCredential.id }));

    } catch (error) {
        next(error);
    }
};

/**
 *  Get a Credential specified by Id
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
exports.getCredential = async (req, res, next) => {
    try {

        //Search by id
        const searchCredential = await Credential.findById(req.params.id);

        if (!searchCredential) {
            return next(new AppError(404, errorDescription.notFound, errorMessage.notFound), req, res, next);
        }

        res
            .status(200)
            .json(successRes(successMessage.credentialFound, 200, {
                id: searchCredential.id,
                platform: searchCredential.platform,
                username: searchCredential.username,
                password: searchCredential.password,
                createdAt: searchCredential.createdAt,
                updatedAt: searchCredential.updatedAt
            }));

    } catch (error) {
        next(error);
    }
};

/**
 *  Get List of Credentials
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
exports.getCredentials = async (req, res, next) => {
    try {

        const credentialList = await Credential
            .find({ userId: req.user.id })
            .select('id')
            .select('platform')
            .select('username')
            .select('password')
            .select('createdAt')
            .select('updatedAt');

        if (!credentialList)
            return next(new AppError(404, errorDescription.notFound, errorMessage.notFound), req, res, next);

        res
            .status(200)
            .json(successRes(successMessage.credentialListFound, 200, credentialList));

    } catch (error) {
        next(error);
    }

};
