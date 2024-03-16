const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

/**
 * Schema for Credential Object
 */
const credentialSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    platform: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

/**
 * Encrypt password before saving to Database
 */
credentialSchema.pre("save", async function (next) {
    // Hashing the password
    this.password = await bcrypt.hash(this.password, 12);
    next();

});


const Credential = mongoose.model("Credential", credentialSchema);
module.exports = Credential;