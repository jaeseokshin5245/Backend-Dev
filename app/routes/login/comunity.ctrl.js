"use strict";

const { checknumdb } = require("../../db/connectDB");
const Comunity = require("../../model/Comunity.js");
const { search } = require("./router");

const process = {
    //학교커뮤니티 접속
    schCo: async (req, res) =>{
        const user= new User(req.body);
        const response=await user.judge();
        return res.json(response);
    },
    //학과커뮤니티 접속
    depCo: async (req, res) =>{
        const user= new User(req.body);
        const response=await user.judge();
        return res.json(response);
    },
}