import { Router } from "express";
import CartsManagerDB from "../../dao/dbManager/cartManagerDB.js";

const cartsRouterDB = Router();
const cartsMDB = new CartsManagerDB();

cartsRouterDB.get("/", async (request) => {
  let carts = await cartsMDB.getAll();
  response.send({ status: "success", payload: carts });
});

cartsRouterDB.post("/", async (request, response) => {
  const { products, id } = request.body;

  let productToCar = { products, id };
  let result = await cartsMDB.saveCart(productToCar);

  response.send({ status: "success", payload: result });
});

export default cartsRouterDB