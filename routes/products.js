import express from 'express';
import ProductManager from '../api/productManager.js';

const productRouter = express.Router();
const productManager = new ProductManager();

productRouter.post('/', async (req, res) => {
    try {
        let product = req.body
        let products = await productManager.addProduct(product);
        res.send(product);
    } catch (error) {
        console.log(error);
    }
});

productRouter.get('/', async(req, res) => {
    try {
        let products = await productManager.getProducts();
        res.send(products);
    } catch (error) {
        console.log(error)
        res.send('Errror')
    }
});

export default productRouter;