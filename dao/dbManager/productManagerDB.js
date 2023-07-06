import ProductsModel from '../models/productModel.js'
import commonsUtils from '../../utils/commons.js'
import Products from '../productsDao.js'

class ProductsManagerDB {

  //CREO UN PRODUCTO 
  static async create(req, res) {
    const { body } = req;
  
    // Verificar si el usuario es premium o no
    const isPremiumUser = req.user.role === 'premium';
  
    // Establecer el owner del producto según el tipo de usuario
    const owner = isPremiumUser ? req.user.email : 'admin';
  
    // Agregar el campo owner al cuerpo del producto
    const productData = {
      ...body,
      owner: owner
    };
  
    const result = await Products.createProduct(productData);
    res.status(201).json(result);
  }
  //LLAMO A LOS PRODUCTOS
  static async get(req, res) {
    const result = await Products.getProducts()
    res.status(200).json(result)

  }
  //LLAMO PRODUCTO POR ID
  static async getById(req, res) {
    const { params: { id } } = req
    const result = await Products.getProductById(id)
    if (!result) {
      return res.status(404).end()
    }
    res.status(200).json(result)
  }
  //MODIFICO UN PRODUCTO POR ID
  static async updateById(req, res) {
    const id = req.params.id;
    const data = req.body;
  
    // Verificar si el usuario es premium o admin
    const isAdmin = req.user.role === 'admin';
    const isPremiumUser = req.user.role === 'premium';
  
    // Obtener el owner actual del producto
    const product = await Products.getProductById(id);
    if (!product) {
      return res.status(404).end();
    }
  
    // Verificar si el usuario puede actualizar el producto
    if (!(isAdmin || (isPremiumUser && product.owner === req.user.email))) {
      return res.status(403).json({ message: 'No tienes permiso para actualizar este producto' });
    }
  
    await Products.updateProductById(id, data);
    res.status(200).json({ message: 'Producto actualizado exitosamente' });
  }
  //ELIMINO UN PRODUCTO POR ID
  static async deleteById(req, res) {
    const id = req.params.id;
  
    /*/ Verificar si el usuario es admin
    const isAdmin = req.user.role === 'admin';*/
  
    // Obtener el owner actual del producto
    const product = await Products.getProductById(id);
    if (!product) {
      return res.status(404).end();
    }
  
    // Verificar si el usuario puede eliminar el producto
    if (!(isAdmin || product.owner === req.user.email)) {
      return res.status(403).json({ message: 'No tienes permiso para eliminar este producto' });
    }
  
    await Products.deleteProductById({ _id: id });
    res.status(204).end();
  }
  //FILTRO POR CATEGORIA
  static async filtroCategory(req, res) {
    const { params: { category } } = req;
    const result = await ProductsModel.aggregate([
      { $match: { category: category } },
      {
        $group: {
          _id: 1,
          productos: { $push: { name: "$name", description: "$description", price: "$price", stock: "$stock" } }
        }
      }
    ],

    )
    res.status(200).json(result)
  }
  //FILTRO POR LIMITE, PAGINA, SORT
 static async paginate(req,res){
  const {query: {limit=1, page=1, sort}} = req;
  const options ={
      limit,
      page
  }
  if(sort){
    options.sort = {price: sort}
  }
    const result = await ProductsModel.paginate({},options);
    res.status(200).json(commonsUtils.busResponds(result))
    
}

}

export default ProductsManagerDB;