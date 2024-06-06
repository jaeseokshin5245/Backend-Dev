"use strict";

const UserStorage = require("./Userstoreage")

class User {
    //생성자
    constructor(body) {
        this.body = body;
    }

    async login() {
        const client = this.body;
        try {
            const user = await UserStorage.getUserInfo(client.id)

            if (user) {
                if (user.id === client.id && user.password === client.password) {
                    return { success: true };
                }
                return { success: false, msg: "비밀번호가 틀렸습니다." };
            }
            return { success: false, msg: "존재하지 않는 아이디 입니다." };
        } catch (err) {
            return { success: false, msg: err };
        }
    }

    async checknum() {
        const client=this.body;
        try{
            const result=await UserStorage.checkStudent(client.SCHUL_NA, client.SCHUL_NU);
            if(result.success===true){
                return result;
            }
            return {success:false, msg:"존재하기 않은 학번입니다."};
        }catch (err) {
            return { success: false, msg: err };
        }
    }

    async register() {
        const client = this.body;
        try {
            const response = await UserStorage.save(client);
            return response;
        } catch (err) {
            return { success: false, msg: err };
        }
    }
}

module.exports = User;