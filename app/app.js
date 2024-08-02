"use strict";

//모듈
const express = require("express");
const bodyParser = require("body-parser");
const dotenv=require("dotenv");
const morgan = require("morgan");
const accessLogStream = require("./db/log.js")
dotenv.config();

// 서버
const app = express();

//라우팅
const route = require("./routes/login/router");

// 앱 세팅
// app.set("views", "./views"); // html 미사용
// app.set("view engine", "ejs"); // ejs 미사용

app.use(express.static(`${__dirname}/public`)); // 서버 경로 지정
app.use(bodyParser.json()); // json형식 파싱 사용

// URL을 통해 전달되는 데이터에 한글, 공백 등과 같은 문자가 포함될 경우 제대로 인식되지 않는 문제 해결
app.use(bodyParser.urlencoded({ extended: true }));

// 로그 서버 터미널 출력 (common 형식, dev 형식 각각 하나 씩)
app.use(morgan('common', {stream : accessLogStream}));
app.use(morgan('dev'));
app.use("/", route); //use -> 미들 뭬어 등록 매서드

module.exports = app;