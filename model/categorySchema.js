const mongoose = require('mongoose');
const image_path ="/images/"
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 25
    },
    isFunctional: {
        type: Boolean,
        default: false
    },
    icon:{
        type: String,
        set: (v) => {
            return `${image_path}${v}`
        }
    }
});

module.exports = categorySchema;