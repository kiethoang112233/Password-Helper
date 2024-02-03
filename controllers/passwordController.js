const AppError = require("../utils/appError");
const { errorDescription, errorMessage } = require("../utils/const");
const passwordHelper = require("../utils/passwordHelper");


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
        return res.status(200).json({ password: password });

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

        const leakedCount = await passwordHelper.checkPasswordLeak(password);
        if (leakedCount > 0) {
            return res.status(200).json({ message: `The password has been leaked ${leakedCount} times. Consider choosing a different one.` });
        } else if (leakedCount === 0) {
            return res.status(200).json({ message: 'The password has not been leaked. It appears to be safe.' });
        } else {
            return next(new AppError(500, errorDescription.checkPasswordFail, errorMessage.checkPasswordFail), req, res, next);
        }

    } catch (error) {
        next(new AppError(500, errorDescription.internalServerError, errorMessage.internalServerError), req, res, next);
    }
}