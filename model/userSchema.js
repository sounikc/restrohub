const config = require('config')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    }
});

userSchema.methods.passwordMatches = function(password){
    return bcrypt.compareSync(password, this.password);
}

userSchema.methods.generateJwtToken = function(){
    const privateKey = config.get('jwtSecretKey');
    const token = jwt.sign({_id: this._id}, privateKey);

    return token
}

module.exports = userSchema;