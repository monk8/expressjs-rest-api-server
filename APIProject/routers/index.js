const express = require('express');
const router = express.Router();
const userController = require('../controllers/index');
router.route('/')
    .get(userController.index)
    .post();
module.exports = router;
