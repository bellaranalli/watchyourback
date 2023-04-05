import { Router } from 'express'

import productModel from '../../dao/models/productModel.js';
import commonsUtils from '../../utils/common.js';
const routerVistaProducto = Router()

//la ruta para llamar a todos los productos sería localhost:8080/productos/total
routerVistaProducto.get('/total', async (req, res) => {
  const productos = await productModel.find().lean()
  res.render('productosDB', { productos: productos })
 // console.log(productos)
})

//la ruta para llamar a todos los productos por categoría sería localhost:8080/productos/:category
routerVistaProducto.get('/:category', async (req, res) => {
  const { category } = req.params;
  const productos = await productModel.find({ category: category }).lean();
  res.render('productosDB', { productos: productos });
});

//la ruta para llamar por PAGINATE en la db sería localhost:8080/productos?limit=2&page=1&sort=asc (o bien por defecto localhost:8080/productos/)
routerVistaProducto.get('/', async (req, res) => {
  const { query: { limit = 5, page = 1, sort } } = req;
  const options = {
    limit,
    page
  }
  if (sort) {
    options.sort = { price: sort }
  }
  const productos = await productModel.paginate({}, options)
     console.log(productos)
      res.render('productosPartialsDB', (commonsUtils.busResponds(productos)));
  })

;


export default routerVistaProducto



