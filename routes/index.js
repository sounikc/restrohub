var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');
const categorySchema = require('../model/categorySchema');

const Category = mongoose.model('Category',categorySchema);

/* GET category listing. */
router.get('/', async (req, res, next) => {
  const result = await Category.find().select('name isFunctional _id icon').sort('name');
  // console.log(req.session);
  res.render('index', { title: 'Restrohub', categories: result, username:req.session.username });
});

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Restrohub' });
// });

module.exports = router;
