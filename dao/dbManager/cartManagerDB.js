import cartsModel from "../models/cartModel.js"
import ProductsManagerDB from './productManagerDB.js'


export default class CartsManagerDB {
  constructor() {
    console.log("Trabajando sobre mongoDB Atlas en Carts");
  }

  getAll = async () => {
    const result = await cartsModel.find();
    return result;
  };

  saveCart = async (cart) => {
    let result = await cartsModel.create(cart);
    return result;
  };

  updateCart = async (id) => {
    let result = await cartsModel.updateOne({ _id: id });
    return result;
  };
}