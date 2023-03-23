import express from 'express'

import apiRouter from './routes/api/index.js'
import viewsRouter from './routes/views/index.js'
import { init } from './db/mongodb.js'

init()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/static', express.static('./public'))

app.set('view engine', 'hbs')
app.set('views', './views')

app.use('/', viewsRouter)
app.use('/api', apiRouter)

export default app