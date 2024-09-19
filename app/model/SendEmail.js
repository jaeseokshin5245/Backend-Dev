"user strict";

const { response } = require("express");
const nodemailer = require("nodemailer")

function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

class SendEmail{
    // 생성자
    constructor(body){
        this.body = body
    }
    // 이메일 송신
    async sendMail(){
        const client = this.body;
        const emailNumber = generateRandomNumber(111111, 999999);
        const mailOptions = {
            from : {
                name : "ddingdong.offical",
                address : process.env.NODE_MAILER_ID,
            },
            to :  [client.email],
            subject : "띵동 인증번호 요청",
            html : `
                <h2>띵동 이메일 인증</h2>
                <p>띵동에서 알려드립니다.</p>
                <p>본 이메일 주소와 연결된 띵동 계정의 이메인 인증 번호 요청을 받았습니다.\n</p>
                <p>인증 번호</p>
                <h1>${emailNumber}</h1>
                <p>해당 계정으로 요청하지 않았다면 이 메일을 무시하십시오.</p>
                <p>항상 띵동을 이용해주셔서 감사합니다.</p>
                <p>띵동 팀 드림</p>`
        }

        const smtpTransport = nodemailer.createTransport({
            service:'gmail',
            host : "smtp.gmail.com",
            port : process.env.GMAIL_PORT,
            secure : false,
            auth:{
                user: process.env.NODE_MAILER_ID,
                pass: process.env.NODE_MAILER_PASSWORD,
            },
            tls:{
                rejectUnauthorized:false,
            },
        })
        try {
            const mailSentResult = await smtpTransport.sendMail(mailOptions);
            console.log('Email sent: ' + mailSentResult.response);
            return { success: true, emailNum: emailNumber };
        } catch (error) {
            console.error('Error sending email:', error);
            return { success: false, error: error.msg };
        }
    }
}

module.exports = SendEmail;