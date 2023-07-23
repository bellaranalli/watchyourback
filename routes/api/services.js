import emailService from '../../services/email.service.js'
import twilioService from '../../services/twilio.service.js'
import { Router } from 'express'
import { uploader } from '../../utils.js'

process.env.NODE_TLS_REJECT_UNAUTHORIZED  //uso esta línea porque no me deja enviar el mail sino

const serviceRouter = Router()

serviceRouter.get('/services', async (req, res) => {
  res.send(`
  <div>
    <h1>Hello world! Hola mundo!</h1>
    <ul>
      <li><a href="/email">Send email</a></li>
      <li><a href="/sms">Send SMS</a></li>
    </ul>
  </div>
  `)
})

/*erviceRouter.get('/new-password', async (req, res) => {
  console.log('token', req.query.token)
  if (req.query.token) {
    res.send(`
    <div>
      <h1>Reset password</h1>
      <form action="/new-password" method="POST">
        <input type="email" name="email" placeholder="Email" />
        <button type="submit">Send</button>
      </form>
    </div>
    `)

  } else {
    res.send(`
  <div>
    <h1>No puedes estar acá</h1>
  </div>
  `)
  }
})*/

serviceRouter.get('/email', async (req, res) => {
  const attachments = [
    {
      filename: 'image.png',
      path: 'public/img/image.png', 
      cid: 'programadora',
    },
  ]
  const result = await emailService.sendEmail(
    process.env.EMAIL_TEST,
    'Hola. ¿Cómo estás?',
    `
    <div>
      <h1>Hola. ¿Cómo estás?</h1>
      <p>Con este enlace podrás cambiar tu contraseña</p>
      <a href="http://localhost:8080/reset-password?token=${Date.now()}">Cambiar contraseña</a>
      <p>Saludos.</p>
    </div>
    `,
    attachments  // Agrega los adjuntos al enviar el email
  );
  console.log(result)
  res.send(`
  <div>
    <h1>EMAIL ENVIADO!</h1>
    <a href="/services">Go back</a>
  </div>
  `)
})

serviceRouter.get('/sms', async (req, res) => {
  const result = await twilioService.sendSMS(process.env.TWILIO_PHONE_TEST, 'Hola! Cómo estás? Gracias por unirte a nuestra comunidad.')
  console.log(result)
  res.send(`
  <div>
    <h1>SMS ENVIADO!</h1>
    <a href="/services">Go back</a>
  </div>
  `)
})
serviceRouter.get('/thanks', async (req, res) => {
  const name = req.query.name
  const product = req.query.product
  const target = process.env.TWILIO_PHONE_TEST
  const body = `Gracias, ${name}, tu solicitud del producto ${product} ha sido aprobada.`
  const result = await twilioService.sendSMS(target, body)
  console.log(result)
  res.send(`
  <div>
    <h1>SMS ENVIADO!</h1>
    <a href="/">Go back</a>
  </div>
  `)
})
 export default serviceRouter