import mongoose from "mongoose";

const cart = new mongoose.Schema({
  products: [
    {
      pid: Number,
      quantity: Number,
    },
  ],
  id: Number,
});

export default mongoose.model('Carts', cart);
