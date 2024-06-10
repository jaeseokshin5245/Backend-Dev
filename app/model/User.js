"use strict";

const UserStorage = require("./Userstoreage")

class User {
    //생성자
    constructor(body) {
        this.body = body;
    }

    async login() {
        const client = this.body;
        const user = await UserStorage.getLoginInfo(client.email)

        if (user) {
            if (user.email === client.email && user.user_Password === client.user_Password) {
                return { success: true };
            }
            return { success: false, msg: "비밀번호가 틀렸습니다." };
        }
        return { success: false, msg: "존재하지 않는 아이디 입니다." };
    }

    async checknum() {
        const client=this.body;
        const result=await UserStorage.checkStudent(client.SCHUL_NA, client.SCHUL_NU);
        if(result.success===true){
            return result;
        }
        return {success:false, msg:"존재하기 않은 학번입니다."};
    }

    async signup() {
        const client = this.body;
        const response = await UserStorage.save(client);
        return response;
        }
}

module.exports = User;