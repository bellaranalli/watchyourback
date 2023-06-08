import ProductsModel from './models/productModel.js'

class Products {
    static createProduct(product) {
        return ProductsModel.create(product)
    }

    static getProducts() {
        return ProductsModel.find()
    }

    static getProductById(id) {
        return ProductsModel.findById(id)
    }

    static updateProductById(id, data) {
        return ProductsModel.updateOne({_id: id}, {$set: data})
    }

    static deleteProductById(id) {
        return ProductsModel.deleteOne({_id: id})
    }
}

export default Products