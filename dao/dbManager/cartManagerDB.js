import cartSchema from "../models/cart.Schema.js";

export default class CartsManagerDB {
  constructor() {
    console.log("MongoDB Cart");
  }

  getAll = async () => {
    const carts = await cartSchema.find();
    return carts.map((product) => user.toObject());
  };

  saveCart = async (cart) => {
    let result = await cartSchema.create(cart);
    return result;
  };

  updateCart = async (id) => {
    let result = await cartSchema.updateOne({ _id: id });
    return result;
  };
}
