const express = require('express');

const rolesController = require("../controller/roles.js");

const router = express.Router();

//register
router.post('/create', rolesController.createRoles);

module.exports = router;