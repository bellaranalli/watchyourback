import { Router } from 'express'

import MessageManagerDB from '../../dao/dbManager/messageManagerDB.js'

const messageRouter = Router()

messageRouter.get('/', async (req, res) => {
  const mensajes = await MessageManagerDB.find()
  res.render('message', { mensajes })
})

export default messageRouter