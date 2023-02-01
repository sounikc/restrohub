var express = require('express');
var Joi = require('joi');
var bcrypt = require('bcrypt');
var _= require('lodash');
var router = express.Router();
const mongoose = require('mongoose');
const userSchema = require('../model/userSchema');
const User = mongoose.model('User',userSchema);
const session = require('express-session')

/* User Registration */
router.post('/register', async (req, res, next) => {

    const isValidRes = validateUser(req.body);

    if(isValidRes.error) return res.status(400).send(isValidRes.error.details[0].message);
console.log(req.body)
    let user = await User.findOne({email: req.body.email});
    if(user) return res.status(400).send('User is already registered!');

    //before lodash pick
    //-------------------

    // user = new User({
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: req.body.password
    // });

    //after lodash pick()
    //--------------------
    
    user = new User(_.pick(req.body, ['name','email','password']))

    // generate salt to hash password
    const salt = await bcrypt.genSalt(10);
    // now we set user password to hashed password
    user.password = await bcrypt.hash(user.password, salt);

    const result = await user.save();
    const token = user.generateJwtToken();

    req.session.jwToken = token;
    req.session.username = user.name;
    res.header('x-jwt-auth-token', token).send(_.pick(result,['_id','name','email']));
});
/* User login */
router.post('/login', async (req, res, next) => {

    const isValidRes = validateSigninUser(req.body);

    if(isValidRes.error) return res.status(400).send(isValidRes.error.details[0].message);

    let user = await User.findOne({email: req.body.email});
    if(!user) res.status(400).send('User is not registered! Please create new account!');

    var isPasswordMatch = user.passwordMatches(req.body.password)

    if(!isPasswordMatch) return res.status(400).send('Password Does not match!'); 
    const token = user.generateJwtToken();

    req.session.jwToken = token;
    req.session.username = user.name;
    res.header('x-jwt-auth-token', token).send(_.pick(user,['_id','name','email']));
});

function validateUser(user)
{
    const JoiSchema = Joi.object({
      
        name: Joi.string()
                  .min(5)
                  .max(30)
                  .required(),
                    
        email: Joi.string()
               .email()
               .min(5)
               .max(50)
               .required(),
        password: Joi.string()
               .min(8)
               .required(),
        confirmPassword: Joi.string().required().valid(Joi.ref('password'))
    });
  
    return JoiSchema.validate(user)
}
function validateSigninUser(user)
{
    const JoiSchema = Joi.object({
      
        name: Joi.string()
                  .min(5)
                  .max(30)
                  .required(),
                    
        email: Joi.string()
               .email()
               .min(5)
               .max(50)
               .required(),
        password: Joi.string()
               .min(8)
               .required()
    });
  
    return JoiSchema.validate(user)
}
module.exports = router;
