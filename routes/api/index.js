import { Router } from 'express'

//import estudiantesRouter from './estudiantes.js'
import routerMessages from './messagesDB.js'

const router = Router()

//router.use('/estudiantes', estudiantesRouter)
router.use('/mensajes', routerMessages)

export default router