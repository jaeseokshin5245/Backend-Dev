"use strict";

const { checknumdb } = require("../../db/connectDB");
const User = require("../../model/User");
//const Start = require("../../db/School_list.csv");
//const { response } = require("../../../app");

const output = {
    start: (req, res) => {
        const start = new Start(req.body);
        return res.render("login/router");
    }
}

const process = {
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
    //회원가입 학교 리스트 보내기
    register: async (req, res) => {
        try {
            const user = new User(req.body);
            const response = await user.register();
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
        const user = new User(req.body);
        const response = await user.checkemail();
        return res.json(response);
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
    }
};

module.exports = {
    output,
    process,
};

