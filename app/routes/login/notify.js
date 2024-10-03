"use strict"

const Noti = require("../../model/Noti")

const process = {
    // 학교 공지 목록
    schoolNofiy : async (req, res) => {
        try {
            const user = new Noti(req.body);
            const response = await user.login();
            return res.json(response);
        } catch (error) {
            return res.status(500).json({error : error.message })
        }
    },
    // 학교 공지 게시글 상세
    schoolNofiyDetail : async (req, res) => {
        try {
            const user = new Noti(req.body);
            const response = await user.login();
            return res.json(response);
        } catch (error) {
            return res.status(500).json({error : error.message })
        }
    },
    // 학과 공지 목록
    departNofiy : async (req, res) => {
        try {
            const user = new Noti(req.body);
            const response = await user.login();
            return res.json(response);
        } catch (error) {
            return res.status(500).json({error : error.message })
        }
    },
    // 학교 공지 게시글 상세
    departNofiyDetail : async (req, res) => {
        try {
            const user = new Noti(req.body);
            const response = await user.login();
            return res.json(response);
        } catch (error) {
            return res.status(500).json({error : error.message })
        }
    },
};

module.exports = {
    process,
};