const express = require('express');
//const router = express.Router();
const router = require('express-promise-router')();
const userController = require('../controllers/users');
router.route('/')
    .get(userController.index)
    .post(userController.newUser);
module.exports = router;

/*
另一种写法    
router.get('/',(req,res,next)=>{
});
router.post('/',(req,res,next)=>{
});
*/