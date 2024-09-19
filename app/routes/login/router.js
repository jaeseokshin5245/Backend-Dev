"use strict";

// 모듈
const express = require("express");
const router = express.Router();
const login = require("./login.ctrl");
const comunity=require("./comunity.ctrl");

//router.get("/", ctrl.output.start);

router.post("/", login.output.start);

router.post("/judge", login.process.judge)
router.post("/login", login.process.login)
router.post("/departlist", login.process.departlist)
router.post("/checknum", login.process.checknum)
router.post("/checkmail", login.process.checkemail)
router.post("/register_ok", login.process.register_ok)
router.post("/changepw",  login.process.changePW)
// router.post("/schCo", comunity.process.schCo)
// router.post("/depCo", comunity.process.depCo)

module.exports = router;