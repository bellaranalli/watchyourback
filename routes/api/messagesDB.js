import { Router } from 'express'

import MenssageManagerDB from '../../dao/dbManager/messageManagerDB.js'

const router = Router()

router
  .get('/', MenssageManagerDB.get)
  .post('/', MenssageManagerDB.create)
  .get('/:id', MenssageManagerDB.getById)
  .put('/:id', MenssageManagerDB.updateById)
  .delete('/:id', MenssageManagerDB.deleteById)

export default router