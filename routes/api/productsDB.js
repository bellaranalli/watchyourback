import  express  from 'express';
import { uploader } from '../../utils.js'
import ProductsManagerDB from '../../dao/dbManager/productManagerDB.js'
import Utils from '../../utils/index.js';
const routerProducts = express.Router()
routerProducts.use(express.json())


//EN LAS RUTAS SIEMPRE /MONGOP/...
//la ruta para postear en la db seria localhost:8080/mongop/post
routerProducts.post('/post',Utils.authJWTMiddleware(['admin','premium']),(req,res)=> {ProductsManagerDB.create(req, res)}) 

//la ruta para llamar a todos los productos en la db sería localhost:8080/mongop/get
routerProducts.get('/get', (req,res)=> {ProductsManagerDB.get(req, res)}) 

//la ruta para llamar por ID en la db sería localhost:8080/mongop/get/:id
routerProducts.get('/get/:id', (req,res)=> {ProductsManagerDB.getById(req, res)}) 

//la ruta para modificar por ID en la db sería localhost:8080/mongop/get/:id
routerProducts.put('/get/:id'/*,Utils.authJWTMiddleware(['admin','premium'])*/, (req,res)=> {ProductsManagerDB.updateById(req, res)}) 

//la ruta para eliminar por ID en la db sería localhost:8080/mongop/get/:id
routerProducts.delete('/get/:id',Utils.authJWTMiddleware(['admin','premium']), (req,res)=> {ProductsManagerDB.deleteById(req, res)}) 

//la ruta para llamar por categoria en la db sería localhost:8080/mongop/get/:category
routerProducts.get('/:category', (req,res) => {ProductsManagerDB.filtroCategory(req, res)})

//la ruta para llamar por PAGINATE en la db sería localhost:8080/mongop?limit=2&page=1&sort=asc (limit=num que yo quiera page=num que yo quiera, por defecto toma 1 y 1, sort para desc es de más caro a más barato)
routerProducts.get('/', (req,res) => {ProductsManagerDB.paginate(req, res)})

export default routerProducts;