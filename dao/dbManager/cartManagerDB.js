import mongoose from "mongoose";
import cartsModel from "../models/cartModel.js";


class CartsManagerDB {
  //CREO EL CARRITO
  static async createCarts(req, res) {
    const { body } = req
    const result = await cartsModel.create(body)
    res.status(201).json(result)
  }
//LLAMO A TODOS LOS CARRITOS
  static async getCarts(req, res) {
    const result = await cartsModel.find().populate('products.product')
    res.status(200).json(result)
  }
  static async getCartById(req, res) {
    const { params: { cid } } = req
    const result = await cartsModel.findById(cid).populate('products.product')
    if (!result) {
      return res.status(404).end()
    }
    res.status(200).json(result)
  }
//AGREGO UN PRODUCTO EN UN CARRITO EN ESPECIFICO: PASA POR BODY SOLO EL PID Y CID
  static async addProductToCart(req, res) {
    const { pid, cid } = req.body;

    try {
      const cart = await cartsModel.findById(cid).populate("products.product");
      if (!cart) {
        return res.status(404).json({ message: "CART NOT FOUND" });
      }
      const productIndex = cart.products.findIndex(
        (p) => p.product._id.toString() === pid
      );
      if (productIndex >= 0) {
        cart.products[productIndex].quantity += 1;
      } else {
        cart.products.push({ product: pid });
      }
      await cart.save();
      return res.status(200).json(cart);
    }
    catch (error) {
      console.log(error);
      return res.status(500).json({ message: "SERVER ERROR" });
    }
  }
//ELIMINO UN PRODUCTO EN UN CARRITO EN ESPECIFICO: PASA POR BODY SOLO EL PID Y CID
  static async removeProductFromCart(req, res) {
    const { pid, cid } = req.body;

    try {
      const cart = await cartsModel.findById(cid).populate("products.product");
      if (!cart) {
        return res.status(404).json({ message: "CART NOT FOUND" });
      }
      const productIndex = cart.products.findIndex(
        (p) => p.product._id.toString() === pid
      );
      if (productIndex >= 0) {
        cart.products[productIndex].quantity -= 1;
        if (cart.products[productIndex].quantity === 0) {
          cart.products.splice(productIndex, 1);
        }
        await cart.save();
        return res.status(200).json(cart);
      } else {
        return res.status(404).json({ message: "PRODUCT NOT FOUND" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "SERVER ERROR" });
    }
  }
//ELIMINO UN CARRITO POR ID: PASA POR BODY CID
  static async deleteCart(req, res) {
    const { cid } = req.params;

    try {
        const result = await cartsModel.findByIdAndDelete(cid);
        if (!result) {
            return res.status(404).json({ message: "CART NOT FOUND" });
        }
        return res.status(200).json({ message: "CART DELETED" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "SERVER ERROR" });
    }
}

}  

export default CartsManagerDB


