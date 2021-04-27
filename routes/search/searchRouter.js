var express = require('express');
var router = express.Router();
var searchController = require('./searchController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource from Search Route');
});

// router.get('/near-by-search/:keyword', searchController.nearBySearch);
router.get('/near-by-search', searchController.nearBySearch);

router.get('/place-detail/:id', searchController.placeDetail);

// router.post('/login', userController.login);
module.exports = router;
