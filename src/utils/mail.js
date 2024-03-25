"use strict"
const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
})

module.exports = async (to, subject, message) => {
    const info = await transporter.sendMail({
        from: `"Discord" <${process.env.MAIL_USER}>`, // sender address
        to, // list of receivers
        subject, // Subject line
        html: message, // html body
    })
    return info
}
