const express = require('express');
const { checkPasswordLeaked } = require('./passwordHelper');
const app = express();
const port = 3000;

app.get('/', async (req, res) => {
    const count = await checkPasswordLeaked('password');

    if (count > 0) {
        res.status(200).send(`The password has been leaked ${count} times. Consider choosing a different one.`);
    } else if (count === 0) {
        res.status(200).send('The password has not been leaked. It appears to be safe.');
    } else {
        res.status(500).send('Error checking the password.');
    }
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
