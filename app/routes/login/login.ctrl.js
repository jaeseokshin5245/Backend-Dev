"use strict";

const { checknumdb } = require("../../db/connectDB");
const SendEmail = require("../../model/SendEmail");
const User = require("../../model/User");
const { search } = require("./router");
//const { response } = require("../../../app");

const output = {
    start: (req, res) => {
        return res.render("home/login");
    }
}

const process = {
    //이메일 검색->로그인, 회원가입 분류
    judge: async (req, res) =>{
        const user= new User(req.body);
        const response=await user.judge();
        return res.json(response);
    },
    //로그인
    login: async (req, res) => {
        try {
            const user = new User(req.body);
            const response = await user.login();
            return res.json(response);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },
    //학과 리스트 보내기
    departlist: async (req, res) => {
        try {
            const user = new User(req.body);
            const response = await user.departmentList();
            return res.json(response);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },
    //학번 조회, 학과 리스트 보내기
    checknum: async (req, res) => {
        try {
            const user = new User(req.body);
            const response = await user.checknum();
            return res.json(response);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },
    //이메일 인증
    checkemail: async (req, res) => {
        try {
            const mail = new SendEmail(req.body);
            const response = await mail.sendMail();
            return res.json(response);
        } catch(error) {
            return res.status(500).json({error: error.message});
        }
    },
    //회원가입 완료
    register_ok: async(req, res)=>{
        try {
            const user = new User(req.body);
            const response = await user.register_ok();
            return res.json(response);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },
    changePW: async(req, res)=>{
        try {
            const user = new User(req.body);
            const response = await user.changePassword();
            return res.json(response);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
};

module.exports = {
    output,
    process,
};

