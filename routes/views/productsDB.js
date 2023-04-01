import { Router } from 'express'

import productModel from '../../dao/models/productModel.js';
const routerVistaProducto = Router()

routerVistaProducto.get('/', async (req, res) => {
  const productos = await productModel.find().lean()
  res.render('productosDB', { productos: productos })
})

routerVistaProducto.get('/:category', async (req, res) => {
  const productos = await productModel.find().lean()
  res.render('productosDB', { productos: productos })
})


export default routerVistaProducto



