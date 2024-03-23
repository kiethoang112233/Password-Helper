const axios = require('axios');
const crypto = require('crypto');
const passwordGenerator = require('generate-password');


exports.generateStrongPassword = (length) => {
    // Define password requirements based on OWASP guidelines
    const passwordOptions = {
        length: Math.max(length, 12),            // Password length (at least 12)
        numbers: true,                      // Include numeric characters
        uppercase: true,                    // Include uppercase letters
        lowercase: true,                    // Include lowercase letters
        symbols: true,                      // Include special symbols
        excludeSimilarCharacters: true,     // Exclude similar characters (e.g., 'l' and '1')
        strict: true                        // Ensure password meets all requirements
    };

    return passwordGenerator.generate(passwordOptions);
}

exports.checkPasswordLeak = async (password) => {
    const sha1Hash = await getSHA1Hash(password);
    const prefix = sha1Hash.substring(0, 5);
    const suffix = sha1Hash.substring(5);

    try {
        const response = await axios.get(`https://api.pwnedpasswords.com/range/${prefix}`);
        const hashes = response.data.split('\n');

        for (let i = 0; i < hashes.length; i++) {
            const [hashSuffix, count] = hashes[i].split(':');
            if (hashSuffix === suffix) {
                return parseInt(count);
            }
        }

        return 0;
    } catch (error) {
        console.error('Error checking password:', error);
        return -1;
    }
};

const getSHA1Hash = async (password) => {
    const sha1sum = crypto.createHash('sha1');
    sha1sum.update(password, 'utf-8');
    return sha1sum.digest('hex').toUpperCase();
};