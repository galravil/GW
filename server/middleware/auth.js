const jwt = require('jsonwebtoken')
const config = require('config')


module.exports = function(req, res, next) {
    // get token from header
    const token = req.header('x-auth-token');

    // check if not token
    if(!token) {
        return res.status(401).json({ msg: 'No token' })
    }

    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'))
        
        // can be user as req.user in other requests
        req.user = decoded.user
        next()
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' })
    }
}
