"use strict";

const logger = require("../../db/logger.js")
const User = require("../../model/User");


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
            logger.info(
                `POST /login 200 Response : "success : ${response.success}, msg: ${response.msg}"`
            );
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
            logger.info(
                `GET /register 200 Response : "success : ${response.success}, msg: ${response.msg}"`
            );
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
            logger.info(
                `GET /checknum 200 Response : "success : ${response.success}, msg: ${response.msg}"`
            );
            return res.json(response);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },
    //이메일 인증
    checkemail: async (req, res) => {
        // const user = new User(req.body);
        // const response = await user.checkemail();
        // return res.json(response);
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

