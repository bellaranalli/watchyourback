
import { Router } from 'express'
import messageModel from '../../dao/models/messageModel.js'

const routerVistaMensaje = Router()

routerVistaMensaje.get('/', async (req, res) => {
  const mensajes = await messageModel.find().lean()
  const scripts = { socket: '/socket.io/socket.io.js', index: 'javascripts/index.js', mensajes: mensajes}
  res.render('mensajesDB', scripts)
})

export default routerVistaMensaje