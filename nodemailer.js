const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport(
    {
        host: 'smtp.mail.ru',
        port: 465,
        secure: true,
        auth: {
            user: 's.fd.2021@inbox.ru',
            pass: 'WQKf3D3t'
        }
    },
    {
        from: 'Ваш сайт портфолио <s.fd.2021@inbox.ru>',
    }
)

const mailer = message => {
    transporter.sendMail(message, (err, info) => {
        if(err) return console.log(err);
        console.log('Email sent: ', info);
        transporter.close();
    })
}

module.exports = mailer