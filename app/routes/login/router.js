"use strict";

// 모듈
const express = require("express");
const router = express.Router();
const ctrl = require("./login.ctrl.js");

// GET 요청
router.get("/", ctrl.output.start); // GET 화면
router.get("/register", ctrl.process.checknum); // 학교 리스트 송신

// POST 요청
router.post("/login", ctrl.process.login); // 로그인 요청 (이메일, 비밀번호 수신)
// router.post("/checkmail", ctrl.process.checkmail); // 이메일 인중 (이메일, 인증번호 수신)
// router.post("/register_ok", ctrl.process.register_ok);

module.exports = router;