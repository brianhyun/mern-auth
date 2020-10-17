require('dotenv').config();

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
const User = require('../../models/User');

const router = express.Router();

router.post('/register', (req, res, next) => {
    // Form Validation
    const { errors, isValid } = validateRegisterInput(req.body);

    // Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email }).then((user) => {
        if (user) {
            return res.status(400).json({ email: 'Email already exists' });
        } else {
            // Create New User
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
            });

            // Hash Password Before Saving to Database
            const saltRounds = 10;

            bcrypt.genSalt(saltRounds, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;

                    // Override Password with Hash
                    newUser.password = hash;

                    // Save User to Database
                    newUser
                        .save()
                        .then((user) => res.json(user))
                        .catch((err) => console.log(err));
                });
            });
        }
    });
});

router.post('/login', (req, res, next) => {
    // Form Validation
    const { errors, isValid } = validateLoginInput(req.body);

    // Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    // Retrieve Email and Password from Login Inputs
    const email = req.body.email;
    const password = req.body.password;

    // Find User By Email
    User.findOne({ email }).then((user) => {
        // Check If User Doesn't Exist
        if (!user) {
            return res.status(404).json({ emailnotfound: 'Email not found' });
        }

        // User Exists, Check Entered Password to Stored Password
        bcrypt.compare(password, user.password).then((isMatch) => {
            // Password Matches
            if (isMatch) {
                // Create JWT Payload
                const payload = {
                    id: user.id,
                    name: user.name,
                };

                // Sign Token
                jwt.sign(
                    payload,
                    process.env.PASSPORT_KEY,
                    {
                        expiresIn: 31556926, // 1 year in seconds
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: 'Bearer ' + token,
                        });
                    }
                );
            } else {
                return res
                    .status(400)
                    .json({ passwordincorrect: 'Password incorrect' });
            }
        });
    });
});

module.exports = router;
