import { Router } from 'express'

import cartsModel from '../../dao/models/cartModel.js'
const routerVistaCartID = Router()

routerVistaCartID.get('/:cid', async (req, res) => {
  const cart = await cartsModel.find().lean()
  res.render('cartsDB', { cart: cart })
  console.log(cart)
})

export default routerVistaCartID