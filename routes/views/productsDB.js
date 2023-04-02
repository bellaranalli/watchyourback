import { Router } from 'express'

import productModel from '../../dao/models/productModel.js';
const routerVistaProducto = Router()

//la ruta para llamar a todos los productos sería localhost:8080/productos
routerVistaProducto.get('/', async (req, res) => {
  const productos = await productModel.find().lean()
  res.render('productosDB', { productos: productos })
})

//la ruta para llamar a todos los productos por categoría sería localhost:8080/productos/:category
routerVistaProducto.get('/:category', async (req, res) => {
  const { category } = req.params;
  const productos = await productModel.find({ category: category }).lean();
  res.render('productosDB', { productos: productos });
});

routerVistaProducto.get('/limit', async (req, res) => {
  const {query: {limit=1, page=1}} = req;
    const options ={
        limit, 
        page
    }
    const productos = await productModel.paginate({}, options);
    res.status(200).json(communsUtils.busResponds(result))
    res.render('productosDB', { productos: productos });
});


export default routerVistaProducto



