const axios = require('axios');
const crypto = require('crypto');


exports.generateStrongPassword = (length) => {
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numericChars = '0123456789';
    const specialChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    const allChars = lowercaseChars + uppercaseChars + numericChars + specialChars;

    let password = '';

    // Generate a password with the specified length
    while (password.length < length) {
        const randomIndex = Math.floor(Math.random() * allChars.length);
        password += allChars[randomIndex];
    }

    return password;
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