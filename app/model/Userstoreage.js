"user strict";

const signupinfodb = require("../db/connectDB.js");

class UserStorage {
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
            const infoquery = "insert into USRSCHINFO(email, SCHUL_NA, SCHUL_DE, SCHUL_NU, L_NAME, F_NAME, MTH_LANG) Values(?, ?, ?, ?, ?, ?, ?);"
                signupinfodb.query(infoquery,
                    [userInfo.email, userInfo.school, userInfo.department, userInfo.number, userInfo.Lname, userInfo.Fname, userInfo.language], (err) => {
                        if (err) reject(`${err}`);
                        resolve({ success: true });
                    });

            const loginquery = "insert into USERDTO(email, user_Password) Values(?, ?);"
                signupinfodb.query(loginquery,
                    [userInfo.email, userInfo.password], (err) => {
                        if (err) reject(`${err}`);
                        resolve({ success: true });
                    });
        });
    }
}

module.exports = UserStorage;