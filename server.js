//importo dependencias y rutas
import express from 'express';
import productRouter from './routes/products.js';
import cartsRouter from './routes/carts.js';
import __dirname from './utils.js';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
//se instancian las dependencias

const app = express();
const PORT = 8080;
const httpServer = app.listen(PORT, () => console.log("Running on 8080"));
const socketServer = new Server(httpServer)

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')
app.use(express.static(__dirname + '/public'))


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', productRouter);
app.use('/api/carts', cartsRouter)

app.get('/realtimeproducts', (req, res) => {
    const scripts = { socket: '/socket.io/socket.io.js', index: '/js/index.js' }
    res.render('index2', scripts)
})

console.log(__dirname)

socketServer.on('connection', (socket) => {
    console.log('Usuario conectado')
    socket.emit('conectado', 'me conecto por socketServer')
    socket.on('disconnect', () => {
        console.log('Usuario desconectado')
    })
})




