import { Router } from 'express'

import cartsModel from '../../dao/models/cartModel.js'
const routerVistaCartID = Router()

routerVistaCartID.get('/:id', async (req, res) => {
  const cart = await cartsModel.find().lean()
  //res.render('cartsDB', { cart: carrito })
 // console.log(carrito)

  let id = req.params.id;

  let newFilter = cart.filter( (cart) => {
   // console.log(cart._id.toString() === id)
    return cart._id.toString() === id; 

});

console.log(JSON.stringify(newFilter))

let scripts = { cart: newFilter};

res.render("cartsDB", scripts);


})

export default routerVistaCartID;
