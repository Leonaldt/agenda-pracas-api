const sendgridMail = require('@sendgrid/mail')

sendgridMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name, password) => {
    sendgridMail.send({
        to: email,
        from: 'zulenilson@gmail.com',
        subject: 'Obrigado por se juntar a nós!',
        text: `Bem vindo, ${name}.<br>Esta é a sua senha de acesso ao sistema de agendamento: ${password}.<br>Accesse: ${'https://agenda-pracas-app.herokuapp.com'}`
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

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}