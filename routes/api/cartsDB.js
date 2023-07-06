import  express  from 'express';

import Utils from '../../utils/index.js';
import CartsManagerDB from '../../dao/dbManager/cartManagerDB.js'

const routerCarts = express.Router()
routerCarts.use(express.json())

const cartsMDB = new CartsManagerDB();

//EN LAS RUTAS SIEMPRE comienzan con /MONGOC/...

routerCarts
//la ruta para postear en la db seria localhost:8080/mongoc/post
.post('/post',Utils.authJWTMiddleware(['admin']),CartsManagerDB.createCarts)

//la ruta para mostrar los carritos de la db seria localhost:8080/mongoc/get/carts
.get('/get/carts',/*Utils.authJWTMiddleware(['admin']),*/CartsManagerDB.getCarts)

//la ruta para mostrar los carritos de la db por id seria localhost:8080/mongoc/get/:cid
.get('/get/:cid',Utils.authJWTMiddleware(['admin', 'user', 'premium']),CartsManagerDB.getCartById)

//la ruta para agregar un producto a un carrito de la db por id seria localhost:8080/mongoc/post/:cid   
//(paso por body { "pid": " ", "cid": " "} )
.post('/post/:cid',Utils.authJWTMiddleware(['admin', 'user', 'premium']),CartsManagerDB.addProductToCart)

//la ruta para borrar un producto de un carrito de la db por id seria localhost:8080/mongoc/put/:cid
//(paso por body { "pid": " ", "cid": " "} )
.put('/put/:cid',Utils.authJWTMiddleware(['admin']),CartsManagerDB.removeProductFromCart)

//la ruta para eliminar un carrito de la db por id seria localhost:8080/mongoc/delete/:cid
.delete('/delete/:cid',Utils.authJWTMiddleware(['admin']),CartsManagerDB.deleteCart)

export default routerCarts;



