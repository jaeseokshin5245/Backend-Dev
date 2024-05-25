"use strict";

const { checknumdb } = require("../../db/connectDB");
const User = require("../../model/User");
//const { response } = require("../../../app");

const output = {
    login: (req, res) => {
        res.render("login/router");
    }
}

const process = {
    login: async (req, res) => {
        const user = new User(req.body);
        const response = await user.login();
        return res.json(response);
    },
    register: async (req, res) => {
        const user = new User(req.body);
        const response = await user.register();
        return res.json(response);
    },
    checknum: async (req, res) => {
        const user = new User(req.body);
        const response = await user.checknum();
        return res.json(response);
    },
    checkemail: async (req, res) => {
        const user = new User(req.body);
        const response = await user.checkemail();
        return res.json(response);
    }
};

module.exports = {
    output,
    process,
};

