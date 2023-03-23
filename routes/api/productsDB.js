import { Router } from 'express'

import { uploader } from '../../utils.js'
import ProductsManagerDB from '../../dao/dbManager/productManagerDB.js'

const router = Router()

router
  .get('/', ProductsManagerDB.get)
  .post('/', uploader.single('avatar'), ProductsManagerDB.create)
  .get('/:id', ProductsManagerDB.getById)
  .put('/:id', ProductsManagerDB.updateById)
  .delete('/:id', ProductsManagerDB.deleteById)

export default router