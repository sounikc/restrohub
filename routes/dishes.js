var express = require('express');
var axios = require('axios');
var router = express.Router();
const session = require('express-session')
const mongoose = require('mongoose');
const categorySchema = require('../model/categorySchema');
const Category = mongoose.model('Category',categorySchema);

const dishSchema = require('../model/dishSchema');
const Dish = mongoose.model('Dish',dishSchema);

/* GET dishes listing. */
router.get('/', async (req, res, next) => {
  if(req.query.cid){
    var result = await Dish.find().where({cid: req.query.cid}).sort('price');
    res.render('dish', { title: 'Restrohub', dishes: result, username:req.session.username  });
  }else{
    var result = await Dish.find().sort('price');
    res.send(result);
  }
});
router.get('/create/', async (req, res, next) => {
  try{
  var categories = await Category.find().select('_id name').sort('name');
  res.render('adddish', { title: 'Create Dish', categories: categories, username:req.session.username });
}catch(ex){
  for(field in ex.errors){
    res.status(400).send(ex.errors[field].message);;
  }
}
});
router.get('/:id', async (req, res, next) => {
 
    var result = await Dish.findById(req.params.id).populate('cid');
    res.send(result);
    //res.render('dish', { title: 'Restrohub', dishes: result }); //comment while testing

});

router.get('/edit/:id', async (req, res, next) => {
 
  var dish =  await Dish.findById(req.params.id).populate('cid');
  
  console.log(dish);

  if(dish){
    var categories = await Category.find().select('name isFunctional _id icon').sort('name');
  }
  res.render('update-dish', { dishid: req.params.id, title: 'Update Dish', dish: dish, categories: categories, username:req.session.username  });

});



router.post('/', async (req, res, next) => {
  try{
    const dish = new Dish({
      name: req.body.name,
      cid: req.body.cid,
      price: req.body.price,
      genre: req.body.genre
    });
    const result = await dish.save();
    res.send({title: 'Create Dish', item: result.name});
  }catch(ex){
    for(field in ex.errors){
      res.status(400).send(ex.errors[field].message);;
    }
  }
});

router.put('/:id', async (req, res, next) => {
  try{
    const update = {
      name: req.body.name,
      price: req.body.price,
      cid: req.body.cid,
      inStock: req.body.status,
      genre: req.body.genre
    };
    const result = await Dish.findByIdAndUpdate(req.params.id , update, {new: true})
    res.send({item: result.name});
  }catch(ex){
    for(field in ex.errors){
      res.status(400).send(ex.errors[field].message);;
    }
  }
});

router.delete('/:id', async (req, res, next) => {
  try{
    const result = await Dish.findByIdAndDelete(req.params.id);
    res.send({item: result.name});
  }catch(ex){
    for(field in ex.errors){
      res.status(400).send(ex.errors[field].message);
    }
  }
});

module.exports = router;
