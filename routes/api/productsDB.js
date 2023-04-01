import  express  from 'express';

import { uploader } from '../../utils.js'
import ProductsManagerDB from '../../dao/dbManager/productManagerDB.js'

const routerProducts = express.Router()
routerProducts.use(express.json())


//EN LAS RUTAS SIEMPRE /MONGOP/...
//la ruta para postear en la db seria localhost:8080/mongop/post
routerProducts.post('/post', (req,res)=> {ProductsManagerDB.create(req, res)}) 

//la ruta para llamar a todos los productos en la db seria localhost:8080/mongop/get
routerProducts.get('/get', (req,res)=> {ProductsManagerDB.get(req, res)}) 

//la ruta para llamar por ID en la db seria localhost:8080/mongop/get/:id
routerProducts.get('/get/:id', (req,res)=> {ProductsManagerDB.getById(req, res)}) 

//la ruta para modificar por ID en la db seria localhost:8080/mongop/get/:id
routerProducts.put('/get/:id', (req,res)=> {ProductsManagerDB.updateById(req, res)}) 

//la ruta para eliminar por ID en la db seria localhost:8080/mongop/get/:id
routerProducts.delete('/get/:id', (req,res)=> {ProductsManagerDB.deleteById(req, res)}) 

//la ruta para llamar por categoria en la db seria localhost:8080/mongop/get/:id
routerProducts.get('/:category', (req,res) => {ProductsManagerDB.filtroCategory(req, res)})

//la ruta para llamar por PAGINATE en la db seria localhost:8080/mongop/get/:id
routerProducts.get('/:query', (req,res) => {ProductsManagerDB.paginate(req, res)})

export default routerProducts;