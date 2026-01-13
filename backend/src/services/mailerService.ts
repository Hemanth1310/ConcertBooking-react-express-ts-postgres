const Nodemailer = require("nodemailer");
const { MailtrapTransport } = require("mailtrap");
import jwt from 'jsonwebtoken';

const transport = Nodemailer.createTransport(
  MailtrapTransport({
    token: process.env.MAILER_TOKEN,
  })
);

const sender = {
  address:process.env.EMAIL_ADDRESS,
  name: process.env.EMAIL_NAME,
};

export const sendVerificationEmail =async (userEMAIL:string,userID:string) =>{
    
}