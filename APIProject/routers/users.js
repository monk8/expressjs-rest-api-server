//routers/users.js
const express = require('express');
const router = require('express-promise-router')();
const userController = require('../controllers/users');
const { validateParam, validateBody,schemas } = require('../helpers/routerHelpers');
router.route('/')
    .get(userController.index)
    .post(validateBody(schemas.userSchema),userController.newUser);
router.route('/:userId')
    .get(validateParam(schemas.idSchema, 'userId'),userController.getUser)
    .put([validateParam(schemas.idSchema, 'userId'),validateBody(schemas.userSchema)], userController.replaceUser)
    .patch([validateParam(schemas.idSchema, 'userId'),validateBody(schemas.userOptionalSchema)],userController.updateUser);
router.route('/:userId/cars')
    .get(validateParam(schemas.idSchema, 'userId'),userController.getUserCars)
    .post([validateParam(schemas.idSchema, 'userId'),validateBody(schemas.carSchema)],userController.newUserCar);
module.exports = router;
/*
另一种写法    
router.get('/',(req,res,next)=>{
});
router.post('/',(req,res,next)=>{
});
*/