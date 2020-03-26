var jwt = require('jsonwebtoken')
module.exports.authenticate = function (req,res,next) {
    var headerExists= req.headers.authorization
    if(headerExists){
        jwt.verify(headerExists, 'secret', function (err, decoded) {
            console.log(headerExists)
            if(err){
                console.log(err)
                res.status(401).json('Unautorized in jwt function')
            }
            else{
                req.user = decoded.email
                console.log(decoded.email + " decoded email")
                next()
            }
        })
    }
    else {
        res.status(403).json('No token provided')
    }


}