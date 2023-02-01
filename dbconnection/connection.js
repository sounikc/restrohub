const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/restrohub').then(()=>{
    console.log('db connected...');
}).catch(err =>{
    console.error('db not connected', err)
})