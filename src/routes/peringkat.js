const express = require('express');

const peringkatController = require("../controller/peringkat.js");

const router = express.Router();

//register
// router.post('/create-new', hotelsController.createHotels);

router.get('/get-highest', peringkatController.getHighestPeringkatValue);

module.exports = router;