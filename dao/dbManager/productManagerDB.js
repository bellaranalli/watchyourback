import productSchema from "../models/product.Schema.js";

export default class ProductManagerDB {
  constructor() {
    console.log("MongoDB Product");
  }

  getAll = async () => {
    const products = await productSchema.find().lean(); 
    return products; 
  };

  saveProduct = async (product) => {
    let result = await productSchema.create(product);
    return result;
  };

  updateProduct = async (id) => {
    let result = await productSchema.updateOne({ _id: id });
    return result;
  };
}