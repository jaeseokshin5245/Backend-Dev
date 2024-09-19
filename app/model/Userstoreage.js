"user strict";

const aws=require('aws-sdk');
// DynamoDB 클라이언트 설정
const db=new aws.DynamoDB.DocumentClient({
    region:'ap-northeast-2'
})

class UserStorage {
    static judgeEmailInfo(email){
        return new Promise((resolve, reject)=>{
            const params={
                TableName: 'USERDTO',
                FilterExpression: '#uname = :username_value',
                ExpressionAttributeNames: {
                  '#uname': 'email'  // 필드명 매핑
                },
                ExpressionAttributeValues: {
                  ':username_value': email  // 찾고자 하는 문자열
                }};
            db.scan(params, (err, data)=>{
                if (err) {resolve({success:false, msg:"존재하지 않는 회원입니다."})} 
                //else if(data.length===0){resolve({success:false, msg:"존재하지 않는 회원입니다."})}
                else {
                    resolve({success:true, msg:"존재하는 회원입니다. 로그인을 진행해주세요."})
                  }
            })
        })
    }

    static getLoginInfo(email){
        return new Promise((resolve, reject) =>{
            const params={
                TableName: 'USERDTO',
                FilterExpression: '#uname = :username_value',
                ExpressionAttributeNames: {
                  '#uname': 'email'  // 필드명 매핑
                },
                ExpressionAttributeValues: {
                  ':username_value': email  // 찾고자 하는 문자열
                }};
            db.scan(params, (err, data)=>{
                if (err) {
                    reject(`${err}`);
                  } else {
                      resolve(data.Items)
                  }
            })
        });
    }

    static checkStudent(SCHUL_NU) {
        return new Promise((resolve, reject) => {
            const params={
                TableName: 'WSU_NU',
                FilterExpression: '#uname = :username_value',
                ExpressionAttributeNames: {
                  '#uname': 'SCHUL_NU'  // 필드명 매핑
                },
                ExpressionAttributeValues: {
                  ':username_value': SCHUL_NU  // 찾고자 하는 문자열
                }};
            db.scan(params, (err, data)=>{
                if (err) {resolve({ success: false, msg:"존재하기 않는 학번입니다. 입력 정보를 재확인 해주세요."});} 
                else if (data[0].SCHUL_NU===SCHUL_NU) {resolve({ success : true, msg:data});}
                else {resolve({success: false, msg:"학생 정보와 일치 하지 않습니다. 입력 정보를 재확인 해주세요."});}
            })
        });
    }

    static async save(userInfo) {
        return new Promise((resolve, reject) => {
            const loginParams = {
                TableName: 'USERDTO',
                Item: {
                    email: userInfo.email, 
                    user_Password: userInfo.user_Password
                }
              };
             db.put(loginParams, (err, data) => {
                if (err) return reject(`${err}`);
            });       
            const infoParams = {
                TableName: 'USERSCHINFO',
                Item: {
                    email: userInfo.email, 
                    SCHUL_NU:userInfo.SCHUL_NU,
                    SCHUL_DE: userInfo.SCHUL_DE,
                    SCHUL_NU: userInfo.SCHUL_NU,
                    L_NAME: userInfo.L_NAME,
                    F_NAME: userInfo.F_NAME
                }
            };
            db.put(infoParams, (err, data) => {
                if (err) return reject(`${err}`);
            });
            resolve({ success: true });
    })};

    static async updatePassword(email, user_Password){
        return new Promise((resolve, reject) => {
            const changePasswordParams = {
                TableName:'USERDTO',
                Key:{
                    email:'email'
                },
                UpdateExpression:'set user_Password = :p',
                ExpressionAttributeValues:{
                    ':p':user_Password
                },
                ReturnValues:'UPDATED_NEW'
            }
            db.update(changePasswordParams, (err, data)=>{
                if (err) {
                    console.error('Error executing query:', err); // Debugging line
                    reject(err);
                } else {
                    console.log('Query results:', data.Items); // Debugging line
                    if (data.Items.email === 0) {
                        resolve({ success: false, message: 'No user found with the provided email.' });
                    } else {
                        resolve({ success: true, message: 'Password updated successfully.' });
                    }
                }
            })
        });
    }
}

module.exports = UserStorage;