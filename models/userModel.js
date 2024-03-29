const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require('bcryptjs');

/**
 * Schema for User Object
 */
const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, "Please fill your name"],
    },
    fullName: {
        type: String,
        required: [true, "Please fill your full name"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Please fill your email"],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "Please provide a valid email"],
    },
    password: {
        type: String,
        required: [true, "Please fill your password"],
        minLength: 8,
        select: false,
    },
    passwordConfirm: {
        type: String,
        required: [true, "Please fill your password confirm"],
        validate: {
            validator: function (retypePassword) {
                return retypePassword === this.password;
            },
            message: "You passwords don't match!",
        },
    },
},
    //Collect created_at & updated_at 
    { timestamps: true }
);

/**
 * Encrypt password before saving to Database
 */
userSchema.pre("save", async function (next) {
    // check the password if it is modified
    if (!this.isModified("password")) {
        return next();
    }

    // Hashing the password
    this.password = await bcrypt.hash(this.password, 12);
    //Remove field
    this.passwordConfirm = undefined;
    next();

});

/**
 * Method for Validating Password on User Schema. Password is hashed w/ Bcrypt algo 
 * before comparing with existing one in Database 
 * 
 * @param {*} typedPassword 
 * @param {*} originalPassword 
 * @returns 
 */
userSchema.methods.validatePassword = async function (
    typedPassword,
    originalPassword,
) {
    return await bcrypt.compare(typedPassword, originalPassword);
};


const User = mongoose.model("User", userSchema);
module.exports = User;