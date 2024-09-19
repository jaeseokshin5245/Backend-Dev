"use strict";

const UserStorage = require("./Userstoreage")
const fs = require("fs")
const path = require("path")
const iconv=require("iconv-lite");
const SendEmail = require("./SendEmail");
//const SendEmail=require("./SendEmail")

function get_csv(filename){
    const csvPath=path.join("./db/", filename +"_list.csv")
    const csvBuffer = fs.readFileSync(csvPath)
    const csv=iconv.decode(csvBuffer,"EUC-KR")
    const allRows=csv.split(/\r?\n/)
    const rowData=[]

    for(var singleRow=0; singleRow<allRows.length; singleRow++){
        var rowCells=allRows[singleRow].split(',')
        if(rowCells!=0){
            rowData.push(allRows[singleRow])
        }
    }
    return rowData
}

class User {
    //생성자
    constructor(body) {
        this.body = body;
    }

    //학교 리스트 보내기
    async schoolList(){
        const client=this.body;
        const School_list=get_csv("School")
        return School_list;
    }

    //학과 리스트 보내기
    async departmentList(){
        const client=this.body;
        const Department_list=get_csv(client.SCHUL_NA+"_dep")
        return{success:true, list: Department_list};
    }

    //이메일 로그인 정보에 있는지 확인하기
    async judge(){
        const client=this.body;
        const result=await UserStorage.judgeEmailInfo(client.email)
        const school_list=await this.schoolList();
        if (result.success===false){
            return {success:false, msg: result.msg, list: school_list}
        }
        return {success: result.success, msg: result.msg};
    }

    //로그인
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
        const Department_list=get_csv(client.SCHUL_NA+"_dep")
        if(result.success===true){
            return {success:true, result:result.msg, list: Department_list};
        }
        return {success:false, msg:"존재하기 않은 학번입니다."};
    }

    // 이메일 인증
    async checkemail(){
        const client=this.body;
        const result=await SendEmail.sendMail(client.email);
        if(result.success===true){
            return {success:true, result:result.msg};
        }
        return {success:false, msg:result.msg};

    }
    // 회원가입 정보 DB에 저장
    async register_ok() {
        const client = this.body;
        const response = await UserStorage.save(client);
        return response;
        }
    // 비밀번호 변경
    async changePassword(){
        const client = this.body;
        const response = await UserStorage.updatePassword(client.email, client.user_Password);
        if(response.success===true){
            return {success:true, result:response.msg};
        }
        return {success:false, msg:response.msg};
    }
}

module.exports = User;