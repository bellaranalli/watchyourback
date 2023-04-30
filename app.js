import express from 'express'
//API
import routerProducts from './routes/api/productsDB.js'
import routerCarts from './routes/api/cartsDB.js'
import routerMessages from './routes/api/messagesDB.js'
//VISTA
import routerVistaProducto from './routes/views/productsDB.js'
import routerVistaMensaje from './routes/views/messagesDB.js'
import routerVistaCartID from './routes/views/cartsDB.js'
//MONGO, HANDLEBARS, WEBSOCKET
import { init } from './db/mongodb.js'
import __dirname from './utils.js'
import handlebars from 'express-handlebars'
import { initS } from './socket.js'
//COOKIES Y SESSION MONGO
import cookieParser from 'cookie-parser'
import expressSession from 'express-session';
import MongoStore from 'connect-mongo';
import router from './routes/index.js'
//PASSPORT
import passport from 'passport'
import initPassport from './config/passport.config.js'

import { config } from 'dotenv';
config();

const PORT = process.env.PORT_NODE 
const ENV = process.env.NODE_ENV 
const URL = process.env.NODE_URI  

init()
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))
app.use(express.static(__dirname + '/views/layouts'))
app.use(cookieParser())

let httpServer = app.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}/ in ${ENV} environment.`)
})

initS(httpServer)

app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', __dirname + '/views')

app.use(expressSession({
  store: MongoStore.create({
    mongoUrl: URL,
    mongoOptions: {},
    ttl: 120,
  }),
  secret: "asd",
  resave: false,
  saveUninitialized: false,
}))

initPassport()

app.use(passport.initialize())
app.use(passport.session())

//VISTAS API / THUNDER CLIENT
app.use('/mongop', routerProducts)
app.use('/mongoc', routerCarts)
app.use('/mongom', routerMessages)

//VISTAS DE NAVEGADOR
app.use('/productos', routerVistaProducto)
app.use('/mensajes', routerVistaMensaje)
app.use('/carrito', routerVistaCartID)

//VISTAS COOKIES/SESSION
app.use('/', router)

