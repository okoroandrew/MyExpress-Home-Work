var express = require('express');
var router = express.Router();

let user = {name: "Andrew", biography: "I am a professor in Engineering"}


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/profile', function(req, res, next) {
  const name = req.body.name
  const biography = req.body.biography
  user = {name, biography}
  res.status(200).json({message: "Success", user});
});

router.get('/profile', function(req, res, next) {
  res.status(200).json({message: "Success", user});
});

module.exports = router;
