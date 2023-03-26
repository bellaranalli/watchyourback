import ProductsModel from '../models/productModel.js'

class ProductsManagerDB {

//CREO UN PRODUCTO 
  static async create(req, res) {
   const { body, /*file*/ } = req
   const imagenProducto = {
      ...body,
      //avatar: `/static/imgs/${file.originalname}`,
    }
    const result = await ProductsModel.create(imagenProducto)
    res.status(201).json(result)
  }
//LLAMO A LOS PRODUCTOS
  static async get(req, res) {
    const result = await ProductsModel.find()
    res.status(200).json(result)
  }
//LLAMO PRODUCTO POR ID
  static async getById(req, res) {
    const { params: { id } } = req
    const result = await ProductsModel.findById(id)
    if (!result) {
      return res.status(404).end()
    }
    res.status(200).json(result)
  }
//MODIFICO UN PRODUCTO POR ID
  static async updateById(req, res) {
    const { params: { id }, body } = req
    await ProductsModel.updateOne({ _id: id }, { $set: body })
    res.status(204).end()
  }
//ELIMINO UN PRODUCTO POR ID
  static async deleteById(req, res) {
    const { params: { id } } = req
    await ProductsModel.deleteOne({ _id: id })
    res.status(204).end()
  }

}

export default ProductsManagerDB;