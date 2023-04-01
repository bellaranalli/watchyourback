import { Router } from 'express'

import cartModel from '../../dao/models/cartModel.js'
const routerVistaCartID = Router()

routerVistaCartID.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const cart = await cartModel.findById({ _id: id }).lean();

    if (!cart) {
      throw new Error(`CART ${id} NOT FOUND`);
    }

    res.render('cartsDB', { cart : cart});
    console.log(cart)

  } catch (error) {
    console.error(error);
    res.status(400).send(error.message);
  }
 


})

export default routerVistaCartID;
