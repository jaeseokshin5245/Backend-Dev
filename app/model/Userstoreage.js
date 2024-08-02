"user strict";

const signupinfodb = require("../db/connectDB.js");

class UserStorage {
    static judgeEmailInfo(email){
        return new Promise((resolve, reject)=>{
            const query='select * from USERDTO where email=?;'
            signupinfodb.query(query, [email], (err, data)=>{
                if(err){resolve({success:false, msg:"존재하지 않는 회원입니다."})}
                else if(data.length===0){resolve({success:false, msg:"존재하지 않는 회원입니다."})}
                else {resolve({success:true, msg:"존재하는 회원입니다. 로그인을 진행해주세요."})}
            })
        })
    }

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

    static checkStudent(SCHUL_NU) {
        return new Promise((resolve, reject) => {
            const query = `select * from WSU_NU where SCHUL_NU = ?;`
            signupinfodb.query(query, [SCHUL_NU], (err, data) => {
                if (err) {resolve({ success: false, msg:"존재하기 않는 학번입니다. 입력 정보를 재확인 해주세요."});}
                else if (err===null&&data.length===0) {resolve({ success: false, msg:"학번을 입력해주십시오."});}
                else if (data[0].SCHUL_NU===SCHUL_NU) {resolve({ success : true, msg:data});}
                else {resolve({success: false, msg:"학생 정보와 일치 하지 않습니다. 입력 정보를 재확인 해주세요."});}
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
    static async updatePassword(email, user_Password){
        return new Promise((resolve, reject) => {
            const changePasswordQuery = "UPDATE USERDTO SET user_Password = ? WHERE email = ?;"
            signupinfodb.query(changePasswordQuery,
                [user_Password, email], (err, results) => {
                    if (err) {
                        console.error('Error executing query:', err); // Debugging line
                        reject(err);
                    } else {
                        console.log('Query results:', results); // Debugging line
                        if (results.affectedRows === 0) {
                            resolve({ success: false, message: 'No user found with the provided email.' });
                        } else {
                            resolve({ success: true, message: 'Password updated successfully.' });
                        }
                    }
                });
        });
    }
}

module.exports = UserStorage;