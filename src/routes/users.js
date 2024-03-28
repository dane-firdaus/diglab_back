const express = require('express');

const usersController = require("../controller/users.js");

const router = express.Router();

//register
router.post('/register-user', usersController.registerNewUser);
router.post('/signin', usersController.signIn);

router.get('/list-users', usersController.listAllUsers);

router.get('/list-user-hotel',usersController.listUserByHotelId);

router.get('/get-user',usersController.getUserByEmail);

module.exports = router;