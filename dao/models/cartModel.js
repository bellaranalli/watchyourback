import mongoose from "mongoose";



const carts = new mongoose.Schema({
  products: [
    {
      pid: Number,
      quantity: Number,
    },
  ],
  id: Number,
});

const cartsModel = mongoose.model('Carts', carts);
export default cartsModel;