import express from 'express';
import CartManager from '../api/cartManager.js';

const cartsRouter = express.Router();
const cartManager = new CartManager();

//añado productos al carrito
cartsRouter.post('/', async(req,res) =>{
    let cart = req.body;
    let carts = await cartManager.addCart(cart);
    res.send(carts);

})

//añado productos por id al carrito
cartsRouter.post('/:cid/product/:pid', async(req, res) =>{
let cid = parseInt(req.params.cid);
let pid = parseInt(req.params.pid);
let cto = await cartManager.addProductToCart(cid, pid);
res.send('Producto agregado')
})

//muestro productos del carrito
cartsRouter.get('/:cid', async(req,res) =>{
    let cid = parseInt(req.params.cid);
    let carts = await cartManager.getCartById(cid)
    res.send(carts)
}
)

export default cartsRouter;