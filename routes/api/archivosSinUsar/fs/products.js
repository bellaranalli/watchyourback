import express from 'express';
import ProductManager from '../../dao/fileManager/productManager.js';

const productRouter = express.Router();
const productManager = new ProductManager();

//añado productos a mi lista
productRouter.post('/', async (req, res) => {
    try {
        let product = req.body
        let products = await productManager.addProduct(product);
        res.send(product);
    } catch (error) {
        console.log(error);
    }
});

//HANDLEBARS!! renderizo productos del array para vista sin websockets RUTA /home.handlebars
productRouter.get('/', async (req, res) => {
    try {
        let products = await productManager.getProducts();
        console.log(products);
        res.render('index',
            {products} 
        )
    } catch (error) {
        console.log(error)
        res.send('Error')
    }

});

/*muestro productos total
productRouter.get('/', async (req, res) => {
    try {
        let products = await productManager.getProducts();
        res.send(products);
    } catch (error) {
        console.log(error)
        res.send('Error')
    }
});*/


//muestro productos por id
productRouter.get('/:pid', async (req, res) => {
    let pid = parseInt(req.params.pid)
    let saveId = await productManager.getProductById(pid);
    if (saveId) {
        res.send(saveId)
    } else {
        res.send('Producto no encontrado')
    }
})

//actualizo productos por id
productRouter.put('/:pid', async (req, res) => {
    let pid = parseInt(req.params.pid)
    let { campo, actualizacion } = req.body

    try {
        let newProduct = productManager.updateProductById(pid, campo, actualizacion);
        res.send("Producto Actualizado")
    } catch (error) {
        res.send("Producto no encontrado")
    }
})

//elimino productos por id
productRouter.delete('/:pid', async (req, res) => {
    let pid = parseInt(req.params.pid)
    try {
        let deleteById = productManager.deleteProduct(pid)
        res.send("Producto eliminado")
    } catch (error) {
        res.send('Producto no encontrado')
    }
})

export default productRouter;