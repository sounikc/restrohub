var express = require('express');
var Joi = require('joi');
var router = express.Router();

const mongoose = require('mongoose');
const userSchema = require('../model/userSchema');
const User = mongoose.model('User',userSchema);

/* GET dishes listing. */
router.post('/', async (req, res, next) => {
    const isValidRes = validateUser(req.body);

    if(isValidRes.error) return res.status(400).send(isValidRes.error.details[0].message);

    let user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Invalid Email!');

    const isVaildPassword = user.passwordMatches(req.body.password);
    
    if(!isVaildPassword) return res.status(400).send('Invalid Password!');

    const token = user.generateJwtToken();
    

    res.send(token);
});

function validateUser(user)
{
    const JoiSchema = Joi.object({
        email: Joi.string()
               .email()
               .min(5)
               .max(50)
               .required(),
        password: Joi.string()
               .min(8)
               .required(),
    });
  
    return JoiSchema.validate(user)
}

module.exports = router;
