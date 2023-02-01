var express = require('express');
var router = express.Router();

/* GET dishes listing. */
router.get('/', (req, res, next) => {
    res.render('signup', { title: 'Restrohub'});
});



module.exports = router;
