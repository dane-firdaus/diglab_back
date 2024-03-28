const express = require('express');

const reviewController = require("../controller/review.js");

const router = express.Router();

//register
router.post('/create-new', reviewController.createNewReview);

router.get('/total-review', reviewController.getTotalRowReview);

router.get('/total-review-category', reviewController.getTotalReviewGroupByCategory);

router.get('/total-review-subject', reviewController.getTotalSubject);
// router.get('/lists', hotelsController.listAllHotels);
router.get('/list-review', reviewController.listReviewByHotelId);

router.get('/total-point-monthly', reviewController.getTotalPointMothly);

router.get('/total-column-monthly', reviewController.getTotalPointColumnMonthly);

module.exports = router;