import express from 'express'
import routerProducts from './routes/api/productsDB.js'
import routerCarts from './routes/api/cartsDB.js'
import routerMessages from './routes/api/messagesDB.js'
import routerViews from './routes/views/productsDB.js'
import apiRouter from './routes/api/index.js'
import viewsRouter from './routes/views/index.js'
import { init } from './db/mongodb.js'
import __dirname from './utils.js'
import handlebars from 'express-handlebars'
import mongoose from 'mongoose'
import ProductsModel from './dao/models/productModel.js'
import ProductsManagerDB from './dao/dbManager/productManagerDB.js'
import { initS } from './socket.js'

const PORT = process.env.PORT_NODE || 8080
const ENV = process.env.NODE_ENV || 'local'

init()
initS()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/static', express.static( __dirname + '/public'))
app.use(express.static( __dirname + '/views/layouts'))

app.listen(PORT, () => {
    console.log(`Server running in http://localhost:${PORT}/ in ${ENV} environment.`)
  })
 
app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', __dirname + '/views')

app.use('/mongop', routerProducts)
app.use('/mongoc', routerCarts)
app.use('/mongom', routerMessages)

app.use('/views', routerViews)
app.use('/', viewsRouter)
app.use('/api', apiRouter)

//*MUESTRA POR VISTA AUN NO TOMA LOS PRODUCTOS --en construccion--
app.get('/', (req,res)=>{ 
    res.render('productosDB')
  });

  app.get('/mensajes', (req, res) => {
    res.render('mensajesDB');
})
export default app