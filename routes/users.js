const userService = require('../services/userServices')
const passport =  require('passport')

var express = require('express');
var router = express.Router();

let user = {name: "", biography: ""}


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

router.post('/signup', async function(req, res){
  try {
    const createUser = await userService.createUser(req.body)
    res.status(200).json({message: "Success", user:createUser.user, token: createUser.token});
  } catch (error) {
    res.status(400).json({message: "Error", error:error.message}); 
  }
})

router.post('/login', async function(req, res){
  try {
    const loginUser = await userService.login(req.body)
    res.status(200).json({message: "Success", user:loginUser.user, token: loginUser.token});
  } catch (error) {
    res.status(400).json({message: "Error", error:error.message}); 
  }
})

router.get('/get-users', passport.authenticate('jwt',{session:false}), async (req, res)=> {
  const allUser = await userService.getAllUsers()
  res.status(200).json({message: 'success', data: allUser})
})

router.put('/update-user', passport.authenticate('jwt',{session:false}), async function(req, res){
  try {
    const updateUser = await userService.updateUser(req.user.id, req.body)
    res.status(200).json({message: "Success", user:updateUser});
  } catch (error) {
    res.status(400).json({message: "Error", error:error.message}); 
  }
})

router.delete('/delete-users', async (req, res)=> {
  const deleteUser = await userService.deleteUsers
  res.status(200).json({message: 'success', data: deleteUser})
})

module.exports = router;
