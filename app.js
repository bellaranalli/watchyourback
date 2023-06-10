import express from 'express'
//API
import apiRouter from './routes/api/index.js'
//VISTA
import viewRouter from './routes/views/index.js'
//MOCK, COMPRESSION Y ERROR
import routerMock from './mockingproducts/router/mockingproducts.js'
import compression from 'express-compression'
import MiddlewareError from './mockingproducts/utils/errors/MiddlewareError.js'
//MONGO, HANDLEBARS, WEBSOCKET
import { init } from './db/mongodb.js'
import __dirname from './utils.js'
import handlebars from 'express-handlebars'
import { initS } from './socket.js'
//COOKIES Y SESSION MONGO
import cookieParser from 'cookie-parser'
import expressSession from 'express-session';
import MongoStore from 'connect-mongo';
//PASSPORT
import passport from 'passport'
import initPassport from './config/passport.config.js'
import Utils from './utils/index.js'
//LOGGER
import { addLogger } from './utils/logger.js'

import { config } from 'dotenv';
config();

const PORT = process.env.PORT_NODE 
const ENV = process.env.NODE_ENV 
const URL = process.env.NODE_URI  

init()
const app = express()

app.use(expressSession({
  store: MongoStore.create({
    mongoUrl: URL,
    mongoOptions: {},
    ttl: 1500,
  }),
  secret: "asd",
  resave: false,
  saveUninitialized: false,
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))
app.use(express.static(__dirname + '/views/layouts'))
app.use(express.static('public'))
app.use(cookieParser())
app.use(addLogger)

let httpServer = app.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}/ in ${ENV} environment.`)
})

initS(httpServer)

app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', __dirname + '/views')

initPassport()

app.use(passport.initialize())

//RUTAS API / THUNDER CLIENT
app.use('/', apiRouter)

//RUTAS VISTAS DE NAVEGADOR
app.use('/', viewRouter)

//MOCKING, COMPRESSION Y ERROR
app.use(compression({
  brotli:{enabled: true, zlib:{}}
}))
app.use(MiddlewareError)
app.use('/', routerMock)

app.use((err, req, res, next) => {
  /* console.log(err) */
  res 
    .status(err.statusCode || 500)
    .json({success: false, message: err.message})
})

app.get('/loggerTest', (req, res) => {
 // req.logger.fatal('Esto fue un fatal')
  req.logger.error('Esto fue un error')
  req.logger.warn('Esto fue un warn')
  req.logger.info('Esto fue un info')
  req.logger.http('Esto fue un http')
  req.logger.debug('Esto fue un debug')
  res.send('<h1>Hello world!</h1>')
})


//CODIGO QUE NO USO
//imports
/*import routerProducts from './routes/api/productsDB.js'
import routerCarts from './routes/api/cartsDB.js'
import routerMessages from './routes/api/messagesDB.js'
import routerUsers from './routes/api/usersDB.js'
import authRouter from './routes/api/auth.js'*/
/*
/*import routerVistaProducto from './routes/views/productsDB.js'
import routerVistaMensaje from './routes/views/messagesDB.js'
import routerVistaCartID from './routes/views/cartsDB.js'*/
//import router from './routes/index.js'

/*app.use(passport.session())

app.use(expressSession({
  store: MongoStore.create({
    mongoUrl: URL,
    mongoOptions: {},
    ttl: 1500,
  }),
  secret: "asd",
  resave: false,
  saveUninitialized: false,
}))*/

//RUTAS
/*app.use('/mongop', routerProducts)
app.use('/mongoc', routerCarts)
app.use('/mongom', routerMessages)
app.use('/mongou', routerUsers)
app.use('/auth', authRouter)*/
/*app.use('/productos', routerVistaProducto)
app.use('/mensajes', routerVistaMensaje)
app.use('/carrito', routerVistaCartID)*/
//VISTAS COOKIES/SESSION - no sirven porque uso JWT
//app.use('/', router)