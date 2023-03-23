import { Router } from 'express'

import MenssageManagerDB from '../../dao/dbManager/messageManagerDB.js'

const router = Router()

router.get('/', async (req, res) => {
  const mensajes = await MenssageManagerDB.find()
  res.render('chat', { mensajes })
})

export default router