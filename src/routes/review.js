const express = require('express');
const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});
const reviewController = require("../controller/review.js");
const auth = require('../midleware/auth.js');

const router = express.Router();

const createReviewSchema = Joi.object({
    front_desk : Joi.number().required(),
    restaurant : Joi.number().required(),
    kebersihan_kamar : Joi.number().required(),
    fasilitas_kamar : Joi.number().required(),
    concierge: Joi.number().required(),
    pusat_kebugaran : Joi.number().required(),
    layanan_kamar : Joi.number().required(),
    message : Joi.string(),
    total : Joi.number().required(),
    email : Joi.string().email().required(),
    hotel_id : Joi.number().required(),
    review_date : Joi.string().required(),
    type : Joi.string().required(),
    category : Joi.number().required(),
});
//register
router.post('/create-new', validator.body(createReviewSchema), reviewController.createNewReview);

router.get('/total-review', reviewController.getTotalRowReview);

router.get('/total-review-category', reviewController.getTotalReviewGroupByCategory);

router.get('/total-review-subject', reviewController.getTotalSubject);

router.get('/total-subject-by-month', reviewController.getTotalSubjectByMonth);

router.get('/total-subject-by-range', reviewController.getTotalSubjectByRange);

// router.get('/lists', hotelsController.listAllHotels);
router.get('/list-review', reviewController.listReviewByHotelId);

router.get('/total-point-monthly', reviewController.getTotalPointMothly);

router.get('/total-column-monthly', reviewController.getTotalPointColumnMonthly);

router.get('/list-by-type', auth, reviewController.listReviewByFullAndType);

router.get('/list-by-type-filter', auth, reviewController.listReviewByFullAndTypeMonthly);

const partReviewSchema = Joi.object({
    front_desk : Joi.number().required(),
    restaurant : Joi.number().required(),
    kebersihan_kamar : Joi.number().required(),
    fasilitas_kamar : Joi.number().required(),
    concierge: Joi.number().required(),
    pusat_kebugaran : Joi.number().required(),
    layanan_kamar : Joi.number().required(),
    message : Joi.string(),
    total : Joi.number(),
    email : Joi.string().email(),
    hotel_id : Joi.number(),
    review_date : Joi.date().required(),
    type : Joi.string()
});

router.post('/create-new-by-type',  validator.body(partReviewSchema), reviewController.partRiviewByCategory);

router.get('/get-review', auth, reviewController.getReviewById);

router.get('/comparation-index-month', reviewController.getComparation);

router.get('/comparation-index', reviewController.getComparationByLast);

router.get('/list-review-by-month', auth, reviewController.listReviewByMonth);

router.get('/list-review-by-range', auth, reviewController.listReviewByRange);

router.get('/list-review-by-status', auth, reviewController.listReviewByStatus);




module.exports = router;