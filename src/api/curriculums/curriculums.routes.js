const express = require("express");
const Curriculum = require("./curriculums.model");
const router = express.Router();
const { isAuth, isAdmin } = require("../../middlewares/auth");

module.exports = router;
