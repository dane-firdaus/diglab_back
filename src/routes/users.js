const express = require('express');

const usersController = require("../controller/users.js");

const auth = require('../midleware/auth.js');

const router = express.Router();

//register
router.post('/register-user', usersController.registerNewUser);
router.post('/signin', usersController.signIn);

router.get('/list-users', usersController.listAllUsers);

router.get('/list-user-hotel',usersController.listUserByHotelId);

router.get('/get-user', auth,  usersController.getUserByEmail);

router.get('/verify', auth, (req, res) => {
    res.status(200).json({
        message : "auth passed !"
    })
})

module.exports = router;