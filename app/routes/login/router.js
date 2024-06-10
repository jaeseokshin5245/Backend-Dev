"use strict";

// 모듈
const express = require("express");
const router = express.Router();
const ctrl = require("./login.ctrl");
const start = require("./detailRouter");

//router.get("/", ctrl.output.start);

router.post("/", (req,res)=>{
    const route = new start(req.body);
    route.routing(req,res);
});

module.exports = router;