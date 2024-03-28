const express = require('express');

const reviewCategoryControllerr = require("../controller/review-category.js");

const router = express.Router();

//register
router.post('/create-new', reviewCategoryControllerr.createNewCategory);

router.get('/lists', reviewCategoryControllerr.listAllReviewCategory);

module.exports = router;