const express = require('express');
// const { check, validationResult } = require('express-validator')
// const jwt = require('jsonwebtoken')
// const config = require('config')
const auth = require('../middleware/auth')
const galaxyGenerator = require('../utils/galaxyGenerator')


let galaxy = new galaxyGenerator()
galaxy.generate()


const router = express.Router();

// @route   GET api/galaxy
// @desc    Get galaxy
// @access  Private
// router.get('/', auth, (req, res) => {
  router.get('/', (req, res) => {

  try {
      res.json({'data': galaxy.solarSystems, 'connections': Array.from(galaxy.connections)})
   
  } catch {
    console.log(err.message)
    res.status(500).send('Server error')
  }

});


module.exports = router;
