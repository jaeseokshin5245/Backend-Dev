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
            // req:NextApiRequest,
            // res:NextApiResponse
        )
    }
}