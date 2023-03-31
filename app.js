import express from 'express'
//API
import routerProducts from './routes/api/productsDB.js'
import routerCarts from './routes/api/cartsDB.js'
import routerMessages from './routes/api/messagesDB.js'
//VISTA
import routerVistaProducto from './routes/views/productsDB.js'
import routerVistaMensaje from './routes/views/messagesDB.js'
import routerVistaCartID from './routes/views/cartsDB.js'

import { init } from './db/mongodb.js'
import __dirname from './utils.js'
import handlebars from 'express-handlebars'
import { initS } from './socket.js'

const PORT = process.env.PORT_NODE || 8080
const ENV = process.env.NODE_ENV || 'local'

init()
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static( __dirname + '/public'))
app.use(express.static( __dirname + '/views/layouts'))

let httpServer = app.listen(PORT, () => {
    console.log(`Server running in http://localhost:${PORT}/ in ${ENV} environment.`)
  })

initS(httpServer)
 
app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', __dirname + '/views')

//VISTAS API / THUNDER CLIENT
app.use('/mongop', routerProducts)
app.use('/mongoc', routerCarts)
app.use('/mongom', routerMessages)

//VISTAS DE NAVEGADOR
app.use('/productos', routerVistaProducto)
app.use('/mensajes', routerVistaMensaje)
app.use('/carrito', routerVistaCartID)

