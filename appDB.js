import express  from "express";
import __dirname from "./utils.js";
import handlebars from "express-handlebars" 
import mongoose from "mongoose";

import productRouterDB from "./routes/api/productsDB.js";
import cartsRouterDB from "./routes/api/cartsDB.js";
import viewRouterDB from "./routes/api/viewsDB.js";
import {Server} from "socket.io"

const app = express()

//MIDDLEWARES
app.use(express.json()) 
app.use(express.urlencoded({extended: true}))

const PORT = 8080

//MONGO DB
const connection = mongoose.connect('mongodb+srv://jesus:873089@cluster0.qxkrs16.mongodb.net/?retryWrites=true&w=majority')

//HBS
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

//ENDPOINTS
app.use('/', viewRouterDB)

app.use('/api/produts', productRouterDB )
app.use('/api/carts', cartsRouterDB)

app.use(express.static(__dirname + "/public"))

//PUERTO 8080
const httpServer = app.listen(PORT, () => {
  console.log(`Running on ${ PORT }`)
})

const socketServer = new Server( httpServer )


//conection webSocket
socketServer.on('connetion', async (socket) => {
  console.log('Nuevo cliente conectado')
  socket.on('cliente: message', data => {
    console.log(data)
  })

  const db = await productos.getAll()  //!!! atencion que no es lo esperado solo modo prueba
  socket.emit('cliente:ecuchaDB', db )
})