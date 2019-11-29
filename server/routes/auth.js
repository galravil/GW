const express = require('express');
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')
const auth = require('../middleware/auth')

const router = express.Router();

const validUserId = '123'
const validUserNickname = 'user'
const validUserPassword = 'user'


// @route   POST api/users
// @desc    Auth user & get token
// @access  Public
router.post('/',  [
    check('fafLogin', 'nickname is required').not().isEmpty(),
    check('fafPassword', 'password is required').not().isEmpty(),
], (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { fafLogin, fafPassword } = req.body;

    if(fafLogin !== validUserNickname || fafPassword !== validUserPassword) {
        return res.status(400).json({ 'msg': 'Invalid nickname or password' }) 
    }

    const payload = {
        user: {
            id: validUserId
        }
    }

    jwt.sign(payload, config.get('jwtSecret'), {
        expiresIn: 3600000, // 3600
    }, (err, token) => {
        if(err) throw err;
        res.json({ token })
        // TODO: need redirect to the game page
        // res.redirect('/')
    })

    // res.send({ 'msg': 'Passed' })
});


// @route   GET api/users
// @desc    Get logged in user
// @access  Private
router.get('/', auth, (req, res) => {
    try {
        const user = {
            id: validUserId,
            nickname: validUserNickname
        }
        res.json(user)
    } catch {
        console.log(err.message)
        res.status(500).send('Server error')
    }

});


module.exports = router;
