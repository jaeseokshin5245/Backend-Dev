// "use strict";

// const Comudb = require("./Comudb")
// const translate = require("./Language.js")

// class Comunity{
//      //생성자
//      constructor(body) {
//         this.body = body;
//     }
 
//     //학교 커뮤니티 요청
//     async schCo(){
//         const client=this.body;
//         const result=await Comudb.schColist(client.num)
//         if (result.success===false){
//             return {success:false, msg: result.msg, list: result.list}
//         }
//         else{
//             fresult=translate.translate(client.lang, result.msg)
//         }
//         return {success: result.success, msg: fresult};
//     }

//     //학과 커뮤니티 요청
//     async depCo(){
//         const client=this.body;
//         const result=await Comudb.depColist(client.num)
//         const school_list=await this.schoolList();
//         if (result.success===false){
//             return {success:false, msg: result.msg, list: result.list}
//         }
//         return {success: result.success, msg: result.msg};
//     }
// }