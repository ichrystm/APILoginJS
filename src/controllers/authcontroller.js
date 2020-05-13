const express = require('express'); 
const User = require('../models/user');

const mid = require('../middlewares/cors');

const router = express.Router();

router.use(mid);

router.post('/register', async (req, res) => {

    const { email } = req.body;

    try {
        if (await User.findOne({ email })) {
            return status.send(400).send({ error: 'User already exists' });
            } else {
        
            const user = await User.create(req.body);

            user.password = undefined;

            return res.send({ user });

            }
    } catch (err) {
        return res.status(400).send({ error: 'Registration failed' });
    }
});

module.exports = app => app.use('/auth', router);