const sendgridMail = require('@sendgrid/mail')

sendgridMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name, password) => {
    sendgridMail.send({
        to: email,
        from: 'leonidas.ollima@gmail.com',
        subject: 'Obrigado por se juntar com a gente!',
        text: `Bem vindo, ${name}. Esta é a sua senha de acesso ao aplicativo: ${password}.`
    })
}

const sendCancelationEmail = (email, name) => {
    sendgridMail.send({
        to: email,
        from: 'leonidas.ollima@gmail.com',
        subject: 'Sorry to see you go!',
        text: `Goodbye, ${name}. I hope to see you back sometime soon.`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}