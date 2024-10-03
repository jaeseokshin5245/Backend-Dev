"used strict";

class depNoti {
    static inquireDepNotiList(){
        return new Promise((resolve, reject) => {
            const query = `query`
            signupinfodb.query(query, [email], (err, data)=>{
                if(err){resolve({success:false, msg:"존재하지 않는 회원입니다."})}
                else if(data.length===0){resolve({success:false, msg:"존재하지 않는 회원입니다."})}
                else {resolve({success:true, msg:"존재하는 회원입니다. 로그인을 진행해주세요."})}
            })
        })
    }

    static inquireDepNotiList(){
        return new Promise((resolve, reject) => {
            const query = `query`
            signupinfodb.query(query, [email], (err, data)=>{
                if(err){resolve({success:false, msg:"존재하지 않는 회원입니다."})}
                else if(data.length===0){resolve({success:false, msg:"존재하지 않는 회원입니다."})}
                else {resolve({success:true, msg:"존재하는 회원입니다. 로그인을 진행해주세요."})}
            })
        })
    }
}

module.exports = depNoti;