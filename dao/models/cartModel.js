import mongoose from "mongoose";

const carts = new mongoose.Schema({
  products: [{
  product:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products',
        require: true
     },
     quantity: {
        type: Number,
        default: 1
     }}],
},{ timestamps: true });

export default mongoose.model('Carts', carts);



/*import mongoose from "mongoose";


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


 const carts = new mongoose.Schema({
  products: [
    {
      products: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        require: true
      },
      quantity: {
        type: Number,
        default: 1
      },
    }
  ],

},{ timestamps: true});

const cartsModel = mongoose.model('Carts', carts);
export default cartsModel;*/