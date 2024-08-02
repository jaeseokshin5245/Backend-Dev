"use strict";

// 모듈
const express = require("express");
const router = express.Router();
const ctrl = require("./login.ctrl");

//router.get("/", ctrl.output.start);

router.post("/", ctrl.output.start);

router.post("/judge", ctrl.process.judge)
router.post("/login", ctrl.process.login)
router.post("/departlist", ctrl.process.departlist)
router.post("/checknum", ctrl.process.checknum)
router.post("/checkmail", ctrl.process.checkemail)
router.post("/register_ok", ctrl.process.register_ok)
router.post("/changepw",  ctrl.process.changePW)

module.exports = router;