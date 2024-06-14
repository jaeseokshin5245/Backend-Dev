"use strict";

const UserStorage = require("./Userstoreage")
const fs = require("fs")
const path = require("path")
const iconv=require("iconv-lite")
const SendEmail=require("./SendEmail")

function get_csv(filename){
    const csvPath=path.join("./db/", filename +"_list.csv")
    const csvBuffer = fs.readFileSync(csvPath)
    const csv=iconv.decode(csvBuffer,"EUC-KR")
    const allRows=csv.split(/\n|\r/)
    const rowData=[]

    for(var singleRow=0; singleRow<allRows.length; singleRow++){
        var rowCells=allRows[singleRow].split(',')
        if(rowCells!=0){
            rowData.push(rowCells)
        }
    }
    return rowData
}

class User {
    //생성자
    constructor(body) {
        this.body = body;
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
    //학교 리스트 보내기
    async register(){
        const client=this.body;
        const School_list=get_csv("School")
        return{success:true, msg: School_list};
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

    async checkemail(){
        const client=this.body;
        // const sending=await SendEmail.checkemail(client.lang, client.email);

    }

    async register_ok() {
        const client = this.body;
        const response = await UserStorage.save(client);
        return response;
        }
}

module.exports = User;