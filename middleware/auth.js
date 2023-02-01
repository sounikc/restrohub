const jwt = require("jsonwebtoken");
const config = require('config');
const session = require('express-session')

 
const auth = (req, res, next) =>{
  //  const token = req.header('x-auth-token');
  const token = (req.header('x-auth-token')) ? req.header('x-auth-token') : req.session.jwToken;
  // console.log(token)
  //  if(!token) return res.status(401).send('Access Denied! No token provided!');

   if(!token) res.redirect('signin');
  
   try{
    let decoded = jwt.verify(token, config.get('jwtSecretKey'));
    req.user = decoded;
    next();
   }catch(ex){
     res.status(400).send('Invalid Token!');
   }
   
}

module.exports = auth;