import { Router } from 'express'

import productosRouter from './productsDB.js'
import chatRouter from './messagesDB.js'

const router = Router()

router.use('/productos', productosRouter)
router.use('/chat', chatRouter)

export default router