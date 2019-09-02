const jwt = require('jsonwebtoken');
//bring in secret token into restricted middleware
const secrets = require('../secrets.js')

module.exports = (req, res, next) => {
  //requires headers/authorization
  const token = req.headers.authorization;
//checks if the token is valid and if not then require valid credentials.
  if(token){
    //verifying token
    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
      if(err){
        //the token is not valid
        res.status(401).json({ message: 'Invalid Credentials' });
      }else{
        next();
      }
    });
  }else{
    res.status(401).json({message: "No token provided"})
  }
};