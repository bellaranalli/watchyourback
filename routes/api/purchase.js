import express from 'express';
import { Router } from 'express';
import { customAlphabet } from 'nanoid';
import cartModel from '../../dao/models/cartModel.js';
import productModel from '../../dao/models/productModel.js';
import ticketModel from '../../dao/models/ticketModel.js';
import TicketService from './ticketService.js';

const purchaseRouter = Router();

//ruta //localhost:8080/:cid/purchase y paso por body {"cid"}
purchaseRouter.post('/:cid/purchase', async (req, res) => {
  const { cid } = req.params;

  try {
    const cart = await cartModel.findById(cid).populate('products.product');
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    const purchasedProducts = [];
    const failedProducts = [];

    for (const item of cart.products) {
      const product = item.product;
      const quantity = item.quantity;

      if (product.stock >= quantity) {
        // Restar el stock del producto
        product.stock -= quantity;
        await product.save();

        purchasedProducts.push(item);
      } else {
        failedProducts.push(item);
      }
    }

    // Crear el ticket de compra
    const code = generateUniqueCode(); // Generar un código único
    const amount = calculateTotalAmount(purchasedProducts); // Calcular el total de la compra
    const purchaser = cart.purchaser;

    await TicketService.createTicket(code, amount, purchaser);

    // Actualizar el carrito con los productos no comprados
    cart.products = failedProducts;
    await cart.save();

    return res.json({ purchasedProducts, failedProducts });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Generar un código único con nanoid
function generateUniqueCode() {
  const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const length = 8;
  const nanoid = customAlphabet(alphabet, length);
  return nanoid();
}

//Calcular el total de la compra
function calculateTotalAmount(products) {
  let total = 0;
  for (const item of products) {
    total += item.product.price * item.quantity;
  }
  return total;
}

export default purchaseRouter;