//routers/users.js
const express = require('express');
//const router = express.Router();
const router = require('express-promise-router')();
const userController = require('../controllers/users');
const { validateParam, schemas } = require('../helpers/routerHelpers');
router.route('/')
    .get(userController.index)
    .post(userController.newUser);
router.route('/:userId')
    .get(validateParam(schemas.idSchema, 'userId'), userController.getUser)
    .put(userController.replaceUser)
    .patch(userController.updateUser);
router.route('/:userId/cars').get(userController.getUserCars)
    .post(userController.newUserCar);
module.exports = router;
/*
另一种写法    
router.get('/',(req,res,next)=>{
});
router.post('/',(req,res,next)=>{
});
*/