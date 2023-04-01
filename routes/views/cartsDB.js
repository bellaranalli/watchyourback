import { Router } from 'express'

import cartModel from '../../dao/models/cartModel.js'
const routerVistaCartID = Router()

routerVistaCartID.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const cart = await cartModel.findById(id).populate('products.product').lean();

    if (!cart) {
      throw new Error(`CART ${id} NOT FOUND`);
    }

    res.render('cartsDB', { cart });
    console.log(JSON.stringify(cart, null, 2));

  } catch (error) {
    console.error(error);
    res.status(400).send(error.message);
  }
});

export default routerVistaCartID;
