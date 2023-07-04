import mongoose from "mongoose";
import cartsModel from "../models/cartModel.js";
import Carts from "../cartsDao.js";
import Products from "../productsDao.js";


class CartsManagerDB {
//CREO EL CARRITO
  static async createCarts(req, res) {
    const { body } = req
    const result = await Carts.createCart(body)
    res.status(201).json(result)
  }
//LLAMO A TODOS LOS CARRITOS
  static async getCarts(req, res) {
    const result = await Carts.getCarts().populate('products.product')
    res.status(200).json(result)
  }

 //CARRITOS POR ID 
  static async getCartById(req, res) {
    const { params: { cid } } = req
    const result = await Carts.getCartById(cid).populate('products.product')
    if (!result) {
      return res.status(404).send("CART NOT FOUND")
    }
    res.status(200).json(result)
  }
//AGREGO UN PRODUCTO EN UN CARRITO EN ESPECIFICO: PASA POR BODY SOLO EL PID Y CID
static async addProductToCart(req, res) {
  const { pid, cid } = req.body;
  const currentUser = req.user; // Obtener usuario actual

  try {
    const cart = await Carts.getCartById(cid).populate("products.product");
    if (!cart) {
      return res.status(404).json({ message: "CART NOT FOUND" });
    }

    const product = await Products.getProductById(pid); // Producto por id

    /*/ Verificar el rol del usuario actual
    const validRoles = ["admin", "premium", "user"];
    if (!validRoles.includes(currentUser.role)) {
      return res.status(403).json({ message: "Invalid user role." });
    }

    // Verificar si el usuario actual es "premium" y si el producto pertenece a él
    if (
      currentUser.role === "premium" &&
      product.owner &&
      product.owner === currentUser.email
    ) {
      return res
        .status(403)
        .json({ message: "Premium users cannot add their own products to the cart."});
    }*/

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
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "SERVER ERROR" });
  }
}
//ELIMINO UN PRODUCTO EN UN CARRITO EN ESPECIFICO: PASA POR BODY(THUNDER CLIENT) SOLO EL PID Y CID
  static async removeProductFromCart(req, res) {
    const { pid, cid } = req.body;

    try {
      const cart = await Carts.getCartById(cid).populate("products.product");
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
        return res.status(404).json({ message: "CART NOT FOUND" });
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
        const result = await Carts.deleteCartById(cid);
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


