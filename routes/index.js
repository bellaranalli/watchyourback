import { Router } from 'express'

import sessionsApiRouter from './api/session.js'
import sessionsViewsRouter from './views/session.js'

const router = Router()

router.use('/api/sessions', sessionsApiRouter)
router.use('/', sessionsViewsRouter)

export default router