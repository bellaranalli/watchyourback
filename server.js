/*/importo dependencias y rutas
import express from 'express';
import productRouter from './routes/products.js';
import cartsRouter from './routes/carts.js';
import __dirname from './utils.js';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import ProductManager from './dao/fileManager/productManager.js';

//se instancian las dependencias
const app = express();
//const PORT = 8080; comento este puerto para que no se pise con mongoDB, queda activo en appDB.js
const httpServer = app.listen(PORT, () => console.log("Running on 8080"));
const socketServer = new Server(httpServer)
const productManager = new ProductManager();

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')
app.use(express.static(__dirname + '/public'))


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//app.use('/api/products', productRouter); la reemplazo por /home.handlebars
app.use('/api/carts', cartsRouter)
app.use('/home.handlebars', productRouter) //ruta con handlebars

//VISTA CON WEBSOCKET!!
app.get('/realtimeproducts', (req, res) => {
    let products = productManager.getProducts();
    const scripts = { socket: '/socket.io/socket.io.js', index: '/js/index.js', products }
    //console.log(products);
    res.render('index2', scripts);
})


console.log(__dirname)

socketServer.on('connection', (socket) => {
    console.log('Usuario conectado')
    socket.emit('conectado', 'me conecto por socketServer')
    socket.on('disconnect', () => {
        console.log('Usuario desconectado')
    })
})*/

import http from 'http'

import app from './app.js'
import { init } from './socket.js'

const PORT = process.env.PORT_NODE || 8080
const ENV = process.env.NODE_ENV || 'local'

const server = http.createServer(app)

init(server)

server.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}/ in ${ENV} environment.`)
})


