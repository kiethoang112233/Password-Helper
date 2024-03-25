const AppError = require("../utils/appError");
const { errorDescription, errorMessage } = require("../utils/const");
const passwordHelper = require("../utils/passwordHelper");
const Cryptr = require('cryptr');

/**
 *  Encrypt password
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
exports.encryptPassword = async (req, res, next) => {
    try {
        const { secretKey, password } = req.body;
        if (!secretKey || !password) {
            return next(new AppError(401, errorDescription.missingLength, errorMessage.missingLength), req, res, next);
        }

        const cryptr = new Cryptr(secretKey);

        try {
            const encrypted = cryptr.encrypt(password);

            return res.status(200).json({ encryptedPassword: encrypted });
        } catch (error) {
            next(new AppError(500, errorDescription.passwordEncryptionError, errorMessage.passwordEncryptionError), req, res, next)
        }

    } catch (err) {
        next(new AppError(500, errorDescription.internalServerError, errorMessage.internalServerError), req, res, next);
    }
};

/**
 *  Decrypt password
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
exports.decryptPassword = async (req, res, next) => {
    try {
        const { secretKey, encryptedPassword } = req.body;
        if (!secretKey || !encryptedPassword) {
            return next(new AppError(401, errorDescription.missingLength, errorMessage.missingLength), req, res, next);
        }

        const cryptr = new Cryptr(secretKey);

        try {
            const decrypted = cryptr.decrypt(encryptedPassword);

            return res.status(200).json({ decryptedPassword: decrypted });
        } catch (error) {
            next(new AppError(500, errorDescription.passwordDecryptionError, errorMessage.passwordDecryptionError), req, res, next)
        }

    } catch (err) {
        next(new AppError(500, errorDescription.internalServerError, errorMessage.internalServerError), req, res, next);
    }
};

/**
 *  Generate password
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
exports.generatePassword = async (req, res, next) => {
    try {
        const { length } = req.body;
        if (!length) {
            return next(new AppError(401, errorDescription.missingLength, errorMessage.missingLength), req, res, next);
        }

        let password, leakedCount;
        do {
            password = passwordHelper.generateStrongPassword(length);
            leakedCount = await passwordHelper.checkPasswordLeak(password);
        } while (leakedCount !== 0)
        return res.status(200).json({ password });

    } catch (err) {
        next(new AppError(500, errorDescription.internalServerError, errorMessage.internalServerError), req, res, next);
    }
};

/**
 *  Check if a password has been leaked
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
exports.checkPasswordLeak = async (req, res, next) => {
    try {
        const { password } = req.body;
        if (!password) {
            return next(new AppError(401, errorDescription.missingLength, errorMessage.missingLength), req, res, next);
        }

        const leakCount = await passwordHelper.checkPasswordLeak(password);
        return res.status(200).json({ leakCount });

    } catch (error) {
        next(new AppError(500, errorDescription.internalServerError, errorMessage.internalServerError), req, res, next);
    }
}
