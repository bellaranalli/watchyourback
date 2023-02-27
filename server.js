//importo dependencias y rutas
import express from 'express';
import productRouter from './routes/products.js';
import cartsRouter from './routes/carts.js';
import __dirname from './utils.js';
import handlebars from 'express-handlebars';

//se instancian las dependencias

const app = express ();

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')
app.set(express.static(__dirname + '/public'))


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', productRouter);
app.use('/api/carts', cartsRouter)


/*io.on('connection', (socket) => {
    console.log('Usuario conectado')
  
    socket.on('mensaje', (mensaje) => {
      io.emit('mensaje', mensaje)
    })
  
    socket.on('disconnect', () => {
      console.log('Usuario desconectado')
    })
  })*/

console.log(__dirname)

//escucho desde el puerto 8080

const PORT = 8080;
app.listen(PORT, () =>  console.log("Running on 8080"));