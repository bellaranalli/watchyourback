import  express  from 'express';
import ProductsManagerDB from '../../dao/dbManager/productManagerDB.js'

const routerViews = express.Router()
routerViews.use(express.json())

//EN LAS RUTAS SIEMPRE /VIEWS/...

routerViews.get('/get', async (req, res) => {
  const productos = await ProductsManagerDB.get()
  res.render('productos', { productos })
})

export default routerViews