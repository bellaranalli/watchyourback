import  express  from 'express';

import { uploader } from '../../utils.js'
import CartsManagerDB from '../../dao/dbManager/cartManagerDB.js'

const routerCarts = express.Router()
routerCarts.use(express.json())

const cartsMDB = new CartsManagerDB();

//EN LAS RUTAS SIEMPRE comienzan con /MONGOC/...

routerCarts
//la ruta para postear en la db seria localhost:8080/mongoc/post
.post('/post',(req,res)=> {CartsManagerDB.createCarts(req, res)})

//la ruta para mostrar los carritos de la db seria localhost:8080/mongoc/get/carts
.get('/get/carts', (req,res) => {CartsManagerDB.getCarts(req, res)} )

//la ruta para mostrar los carritos de la db por id seria localhost:8080/mongoc/get/carts/:cid
.get('/get/carts/:cid', (req,res) => {CartsManagerDB.getCartById(req, res)} )

//la ruta para agregar un producto a un carrito de la db por id seria localhost:8080/mongoc/post/carts/:cid
.post('/post/carts/:cid', (req,res) => {CartsManagerDB.addProductToCart(req, res)} )

//la ruta para borrar un producto de un carrito de la db por id seria localhost:8080/mongoc/put/carts/:cid
.put('/put/carts/:cid', (req,res) => {CartsManagerDB.removeProductFromCart(req, res)} )

//la ruta para eliminar un carrito de la db por id seria localhost:8080/mongoc/delete/carts/:cid
.delete('/delete/carts/:cid', (req,res) => {CartsManagerDB.deleteCart(req, res)} )

export default routerCarts;



