"use strict";

const { checknumdb } = require("../../db/connectDB");
const User = require("../../model/User");
const Start = require("../../model/Start");
//const { response } = require("../../../app");

const output = {
    start: (req, res) => {
        const start = new Start(req.body);
        return res.render("login/router");
    }
}

const process = {
    login: async (req, res) => {
        try {
            const user = new User(req.body);
            const response = await user.login();
            return res.json(response);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    signup: async (req, res) => {
        try {
            const user = new User(req.body);
            const response = await user.signup();
            return res.json(response);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    checknum: async (req, res) => {
        try {
            const user = new User(req.body);
            const response = await user.checknum();
            return res.json(response);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    // checkemail: async (req, res) => {
    //     const user = new User(req.body);
    //     const response = await user.checkemail();
    //     return res.json(response);
    // }
};

module.exports = {
    output,
    process,
};

