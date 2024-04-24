const express = require('express');

const reviewController = require("../controller/export-excel.js");

const router = express.Router();



router.get('/hotel-review', reviewController.exportReviewByHotelId);
router.get('/try-hotel-review', reviewController.tryExportData);



module.exports = router;