
import { Router } from 'express'
import messageModel from '../../dao/models/messageModel.js'

const routerVistaMensaje = Router()

routerVistaMensaje.get('/', async (req, res) => {
  const mensajes = await messageModel.find()
  res.render('mensajesDB', { mensajes })
})

export default routerVistaMensaje