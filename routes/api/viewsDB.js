import { Router } from "express";
import CartsManagerDB from "../../dao/dbManager/cartManagerDB.js";
import ProductManagerDB from "../../dao/dbManager/productManagerDB.js";
import MessageManagerDB from "../../dao/dbManager/messageManagerDB.js";

const viewRouterDB = Router();
const productsM = new ProductManagerDB();
const cartsM = new CartsManagerDB();
const messageM = new MessageManagerDB();

viewRouterDB.get('/', async (request, response) => {
  let productos = await productsM.getAll();
  console.log(productos);
  response.render("productos", { productos });
});

viewRouterDB.get('/carts', async (request, response) => {
  let carts = await cartsM.getAll();
  console.log(carts);
  response.render('carts', { carts });
});

viewRouterDB.get('/chat', async (request, response) => {
  let chats = 'messages'
  console.log(chats)
  response.render('chat', {chats})
})

export default viewRouterDB;