import  express  from 'express';

import { uploader } from '../../utils.js'
import CartsManagerDB from '../../dao/dbManager/cartManagerDB.js'

const routerCarts = express.Router()
routerCarts.use(express.json())

const cartsMDB = new CartsManagerDB();


routerCarts.get('/get', (req,res)=> {cartsMDB.find(req, res)}) 


routerCarts.post("/post", async (request, response) => {
  const { products, id } = request.body;

  let productToCar = { products, id };
  let result = await cartsMDB.saveCart(productToCar);

  response.send({ status: "success", payload: result });
});

export default routerCarts;



