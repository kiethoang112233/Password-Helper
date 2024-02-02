const express = require('express');
const { checkPasswordLeaked } = require('./passwordHelper');
const app = express();
const port = 3000;

app.get('/', async (req, res) => {
    console.log(1);
    const passwordToCheck = 'your_password_here';

    checkPasswordLeaked(passwordToCheck)
        .then((count) => {
            if (count > 0) {
                console.log(`The password has been leaked ${count} times. Consider choosing a different one.`);
            } else if (count === 0) {
                console.log('The password has not been leaked. It appears to be safe.');
            } else {
                console.log('Error checking the password.');
            }
        });

    res.send(0);
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
