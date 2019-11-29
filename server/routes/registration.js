const express = require('express');
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')

const characterNameGenerator = require('../utils/characterNameGenerator')


const router = express.Router();

// to check during registration
const validFafLogin = 'user'
const validFafPassword = 'user'

const alreadyOcupiedComNames = [
    'Light'
]


// @route   GET api/registration/name
// @desc    Gen a commander name
// @access  Public
router.get('/name',  (req, res) => {
    const faction = req.query.faction

    if (['AEON', 'UEF', 'SERAPHIM', 'CYBRAN'].includes(faction)) {
        const name = characterNameGenerator(faction)
        res.json({ name })
    }

    res.status(400).json({ 'msg': 'Not a valid faction' })
})


// @route   POST api/registration
// @desc    Register user
// @access  Public
router.post('/',  [
    check('fafLogin', 'fafLogin is required').not().isEmpty(),
    check('fafPassword', 'fafPassword is required').not().isEmpty(),
    check('comName', 'comName is required').not().isEmpty(),

], (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { fafLogin, fafPassword, comName } = req.body;

    if(fafLogin !== validFafLogin || fafPassword !== validFafPassword) {
        return res.status(400).json({ 'msg': 'Invalid fafLogin or fafPassword' }) 
    }


    let is_occupied = alreadyOcupiedComNames.includes(comName)

    if(is_occupied) {
        return res.status(400).json({ 'msg': 'comName is already occupied' })
    }

    // generate uuid
    const payload = {
        user: {
            id: '123'
        }
    }

    jwt.sign(payload, config.get('jwtSecret'), {
        expiresIn: 3600000, // 3600
    }, (err, token) => {
        if(err) throw err;
        res.json({ token })
    })

});


module.exports = router;
