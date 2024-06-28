"user strict";

const signupinfodb = require("../db/connectDB.js");

class UserStorage {

    static getLoginInfo(email){
        return new Promise((resolve, reject) =>{
            const emailQuery = `SELECT * FROM USERDTO WHERE email = ?;`
            signupinfodb.query(emailQuery, [email], (err, data) => {
                if (err) {
                    reject(`${err}`);}
                else resolve(data[0]);
            });
        });
    }

    static checkStudent(SCHUL_NA, SCHUL_NU) {
        return new Promise((resolve, reject) => {
            const school=SCHUL_NA+"_NU";
            const query = `select * from ${school} where SCHUL_NU = ?;`
            signupinfodb.query(query, [SCHUL_NU], (err, data) => {
                if (err) { reject("존재하기 않은 학번입니다.");}
                else if (err===null&&data.length===0) { reject("존재하기 않은 학번입니다.");}
                else resolve({ success: true, msg:data});
            });
        });
    }

    static async save(userInfo) {
        return new Promise((resolve, reject) => {
            const loginquery = "insert into USERDTO(email, user_Password) Values(?, ?);"
                signupinfodb.query(loginquery,
                    [userInfo.email, userInfo.user_Password], (err) => {
                        if (err) return reject(`${err}`);
                    });
                    
            const infoquery = "insert into USERSCHINFO(email, SCHUL_NA, SCHUL_DE, SCHUL_NU, L_NAME, F_NAME) Values(?, ?, ?, ?, ?, ?);"
                signupinfodb.query(infoquery,
                    [userInfo.email, userInfo.SCHUL_NA, userInfo.SCHUL_DE, userInfo.SCHUL_NU, userInfo.L_NAME, userInfo.F_NAME], (err) => {
                        if (err) return reject(`${err}`);
                    });
            
                    resolve({ success: true });
        });
    }
}

module.exports = UserStorage;