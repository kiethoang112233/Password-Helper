const express = require('express');
const bodyParser = require('body-parser');
const { generateStrongPassword, checkPasswordLeaked } = require('./passwordHelper');

const app = express();
const port = 3000;

app.get('/', async (req, res) => {
    res.send("Welcome to Password Helper!")
});

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Endpoint to check if a password has been leaked
app.post('/check-password-leak', async (req, res) => {
    try {
        const { password } = req.body;
        if (!password) {
            return res.status(400).json({ error: 'Password is required.' });
        }

        const leakedCount = await checkPasswordLeaked(password);
        if (leakedCount > 0) {
            return res.status(200).json({ message: `The password has been leaked ${leakedCount} times. Consider choosing a different one.` });
        } else if (leakedCount === 0) {
            return res.status(200).json({ message: 'The password has not been leaked. It appears to be safe.' });
        } else {
            return res.status(500).json({ error: 'Error checking the password.' });
        }

    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
});

app.post('/generate-password', async (req, res) => {
    try {
        const { length } = req.body;
        if (!length) {
            return res.status(400).json({ error: 'Length is required.' });
        }

        let password, leakedCount;
        do {
            password = generateStrongPassword(length);
            leakedCount = await checkPasswordLeaked(password);
        } while (leakedCount !== 0)

        return res.status(200).json({ password: password });

    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
});


app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
