const express = require('express'); 
const User = require('../models/user');
const bcrypt = require('bcryptjs');

const mid = require('../middlewares/cors');

const router = express.Router();

router.use(mid);

router.post('/register', async (req, res) => {

    const { email } = req.body;

    try {
        if (await User.findOne({ email }))
            return status.send(400).send({ error: 'User already exists' });
        
            const user = await User.create(req.body);

            user.password = undefined;


        return res.status(200).send({ user });

    } catch (err) {

        return res.status(401).send({ error: 'Registration failed' });

    }
});

router.post('/login', async (req, res) => {

    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user)
    return res.status(404).send({ error: 'User not found' });

    if (!await bcrypt.compare(password, user.password))
    return res.status(401).send({ error: 'Invalid Password' });

    res.status(200).send('Login sucessfull');
    

})




module.exports = app => app.use('/auth', router);