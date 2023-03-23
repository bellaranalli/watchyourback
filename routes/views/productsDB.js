import { Router } from 'express'

import ProductsManagerDB from '../../dao/dbManager/productManagerDB.js'
const router = Router()

router.get('/', async (req, res) => {
  const productos = await ProductsManagerDB.find()
  res.render('productos', { productos })
})

export default router