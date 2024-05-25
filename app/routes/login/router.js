"use strict";

// 모듈
const express = require("express");
const router = express.Router();
const ctrl = require("./login.ctrl");

router.get("/", ctrl.output.login);

router.post("/login", ctrl.process.login);
router.post("/register", ctrl.process.register);
router.post("/checknum", ctrl.process.checknum);
router.post("/checkemail", ctrl.process.checkemail)

module.exports = router;
