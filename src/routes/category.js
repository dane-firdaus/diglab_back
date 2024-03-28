const express = require('express');

const categoryController = require("../controller/category.js");

const router = express.Router();

//register
router.post('/create-new', categoryController.createNewCategory);

router.get('/lists', categoryController.listAllCategories);

module.exports = router;