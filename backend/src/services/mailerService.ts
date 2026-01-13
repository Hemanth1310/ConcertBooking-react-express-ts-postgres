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

export const sendVerificationEmail =async (userEMAIL:string,userId:string) =>{
    const token = jwt.sign({ userId }, process.env.JWT_VERIFICATION_SECRET!, { expiresIn: '1d' });
    const verificationEmail= `${process.env.FRONTEND_URL}/verify-email?token=${token}`

transport
  .sendMail({
    from: sender,
    to: userEMAIL,
    subject: "You are awesome!",
    text: "Congrats for sending test email with Mailtrap!",
    category: "Integration Test",
  })
  .then(console.log, console.error);
}