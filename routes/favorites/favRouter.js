var express = require('express');
var router = express.Router();
var favController = require('./favController.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource in favorites');
});

router.post('/addToFavorites', favController.addToFavorites);

router.get('/loadFavorites', favController.loadFavorites);
// router.get('/loadFavorites/:id', favController.loadFavorites); //=> use params in the link

router.delete('/deletePlace', favController.deletePlace);

router.post('/addNote', favController.addNote);


module.exports = router;
