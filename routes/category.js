
var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');
const categorySchema = require('../model/categorySchema');
const Category = mongoose.model('Category',categorySchema);

const dishSchema = require('../model/dishSchema');
const Dish = mongoose.model('Dish',dishSchema);

/* GET category listing. */
router.get('/', async (req, res, next) => {
  const result = await Category.find().select('name isFunctional _id icon').sort('name');
  res.send(result);
});

router.post('/', async (req, res, next) => {
  try{
    const category = new Category({
      name: req.body.name,
      isFunctional: req.body.isFunctional,
      icon: req.body.icon
    });
    const result = await category.save();
    res.send(result);
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
      isFunctional: req.body.isFunctional
    };
    const result = await Category.findByIdAndUpdate(req.params.id , update, {new: true})
    res.send(result);
  }catch(ex){
    for(field in ex.errors){
      res.status(400).send(ex.errors[field].message);;
    }
  }
});

router.delete('/:id', async (req, res, next) => {
  try{
    const result = await Category.findByIdAndDelete(req.params.id)
    res.send(result);
  }catch(ex){
    for(field in ex.errors){
      res.status(400).send(ex.errors[field].message);;
    }
  }
});

module.exports = router;
