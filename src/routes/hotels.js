const express = require('express');

const hotelsController = require("../controller/hotels.js");

const router = express.Router();

//register
router.post('/create-new', hotelsController.createHotels);

router.get('/lists', hotelsController.listAllHotels);

router.get('/get-hotel', hotelsController.getHotelById);


module.exports = router;