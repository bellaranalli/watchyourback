import { Router } from 'express'

import productModel from '../../dao/models/productModel.js';
const routerVistaProducto = Router()

routerVistaProducto.get('/', async (req, res) => {
  const productos = await productModel.find()
  res.render('productosDB', { productos })
  console.log(productos)
})

export default routerVistaProducto

