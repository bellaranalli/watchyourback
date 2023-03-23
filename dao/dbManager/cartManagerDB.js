import cartModel from "../models/cartModel.js";

export default class CartsManagerDB {
  constructor() {
    console.log("MongoDB Cart");
  }

  getAll = async () => {
    const carts = await cartModel.find();
    return carts.map((product) => user.toObject());
  };

  saveCart = async (cart) => {
    let result = await cartModel.create(cart);
    return result;
  };

  updateCart = async (id) => {
    let result = await cartModel.updateOne({ _id: id });
    return result;
  };
}
