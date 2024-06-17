import nodemailer from 'nodemailer';
import {NextApiRequest, NextApiResponse} from 'next';

const smtpTransport= nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.NODE_MAILER_ID,
        pass:process.env.NODE_MAILER_PASSWORD,
    },
    tls:{
        rejectUnauthorized:false,
    },
});

class SendEmail{
    static checkemail(){
        const handler =async(
            req:NextApiRequest,
            res:NextApiResponse
        ) =>{
            const {email}=req.body;
            const payload=Math.floor(100000 + Math.random()*9000000)+'';

            if(email){
                const mailOptions={
                    from: process.env.NODE_MAILER_ID,
                    to :email,
                    subject: '~~',
                    html:'<strong>http 들어가나봐.</strong>',
                }
                await smtpTransport.sendMail(mailOptions,(error, responses)=>{
                    if(error){
                        res.statub(400).json({success:false})
                    }else{
                        res.statuc(200).json({success:true})
                    }
                    smtpTransport.close();
                })
            }
            return res.status(200).json({success:true});
        }
    }
}

export default handler;