"use strict";

// 모듈
const express = require("express");
const router = express.Router();
const start = require("./detailRouter");

//router.get("/", ctrl.output.start);

router.post("/", ctrl.output.start);

router.post("/login", ctrl.process.login)
router.post("/register", ctrl.process.register)
router.post("/checknum", ctrl.process.checknum)
router.post("/ceckemail", ctrl.process.checkemail)
router.post("/register_ok", ctrl.process.register_ok)

module.exports = router;