const sendgridMail = require('@sendgrid/mail')

sendgridMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name, password) => {
    sendgridMail.send({
        to: email,
        from: 'zulenilson@gmail.com',
        subject: 'Obrigado por se juntar a nós!',
        text: `Bem vindo, ${name}.\nEsta é a sua senha de acesso ao sistema de agendamento: ${password}.\nAccesse o link: ${'https://agenda-pracas-app.herokuapp.com'}`
    })
}

const sendCancelationEmail = (email, name) => {
    sendgridMail.send({
        to: email,
        from: 'zulenilson@gmail.com',
        subject: 'Lamento ver você ir!',
        text: `Adeus, ${name}. Espero ver você de volta em breve.`
    })
}

const sendRecoveryEmail = (email, name, token) => {
    sendgridMail.send({
        to: email,
        from: 'zulenilson@gmail.com',
        subject: 'Recuperação de senha',
        text: `Olá, ${name}.\nClique no link abaixo para redefinir sua senha.\n${'https://agenda-pracas-app.herokuapp.com/reset-password/'}${token}?email=${email}`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail,
    sendRecoveryEmail
}