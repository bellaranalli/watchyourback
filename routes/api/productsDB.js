import {Router} from "express";
import ProductManagerDB from "../../dao/dbManager/productManagerDB.js";

const productRouterDB = Router();

const productMDB = new ProductManagerDB();

productRouterDB.get("/", async (request, response) => {
  let productos = await productMDB.getAll();
  response.send({ status: "success", payload: productos });
});

productRouterDB.post("/", async (request, response) => {
  const { title, desciption, code, price, stock, category, thumbnail, id } =
    request.body;

  let newProduct = {
    title,
    desciption,
    code,
    price,
    stock,
    category,
    thumbnail,
    id,
  };

  const result = await productMDB.saveProduct(newProduct);

  response.send({ status: "success", payload: result });
});

export default productRouterDB;