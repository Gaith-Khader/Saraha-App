import nodemailer from "nodemailer";

export async function sendEmail(to,subject,html) {
    let transporter = nodemailer.createTransport({
        service:'gmail',
        auth: {
            user: process.env.EMAIL, // generated ethereal user
            pass: process.env.PASSWORD, // generated ethereal password
        },
    });
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: `"Saraha App" <${process.env.EMAIL}>`, // sender address
        to,
        subject,
        html
    });
}