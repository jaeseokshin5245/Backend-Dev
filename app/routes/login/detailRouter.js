"use strict";

const ctrl = require("./login.ctrl");

class Router{
    /*생성자**/
    constructor(body){
        this.body = body;
    }

    async routing(req, res) {
        const endpoint = this.body;
        try {
            switch (endpoint.endpoint) {
                case "login" :
                    await ctrl.process.login(req, res);
                    break;
                case "register" :
                    await ctrl.process.register(req,res);
                    break;
                case "checknum":
                    await ctrl.process.checknum(req,res);
                    break;
                case "checkemail":
                    await ctrl.process.checkemail(req,res);
                    break;
                case "register_ok":
                    await ctrl.process.register_ok(req,res);
                    break;
            }
        } catch (err) {
            return { success : false, msg : err };
        }
    }
}



module.exports = Router;