//const fs = require('fs');
import fs from 'fs';

class ProductManager {
    constructor() {
        this.products = [];
        this.path = "./productos.json";
        this.id = 0;
    }

    //static id = 1;

    addProduct = (product) => {
        if (
            !product.name ||
            !product.price ||
            !product.code ||
            !product.description ||
            !product.thumbnail ||
            !product.stock
        ) {
            console.log("Incompleto");
        } else {
            let id = this.products.length + 1;
            product.id = id;
            this.products.push(product);


        }

        if (!fs.existsSync(this.path)) {
            fs.writeFileSync(this.path, JSON.stringify(this.products));
        } else {
            let contenido = fs.readFileSync(this.path, 'utf-8');
            let ptos = JSON.parse(contenido);
            if (ptos.some((p) => p.code === product.code)) {
                // return 'El producto ya existe'
                return 'error'
            }
            let id = ptos.length + 1;
            product.id = id;
            ptos.push(product);
            fs.writeFileSync(this.path, JSON.stringify(ptos));
        }
    }

    getProducts = () => {
        let contenido = fs.readFileSync(this.path, 'utf-8');
        let products = JSON.parse(contenido);

        return products;
    }

    getProductById = (id) => {
        let contenido = fs.readFileSync(this.path, 'utf-8');
        let products = JSON.parse(contenido);

        const prod = products.filter(pto => pto.id === id);

        if (prod.length > 0) {
            return prod;
        }
        return 'Not Found';
    }

    updateProductById = (id, campo, actualizacion) => {
        let contenido = fs.readFileSync(this.path, 'utf-8');
        let products = JSON.parse(contenido);

        products.find(element => {
            if (element.id === id) {
                element[campo] = actualizacion;
                fs.writeFileSync(this.path, JSON.stringify(products));
            }
        });
    }

    deleteProduct = (id) => {
        let contenido = fs.readFileSync(this.path, 'utf-8');
        let products = JSON.parse(contenido);

        let newProducts = products.filter(prod => prod.id !== id);

        fs.writeFileSync(this.path, JSON.stringify(newProducts));
    }
}


// var pto = new ProductManager();
// pto.addProduct({ name: 'ale1',price: 99, code: 'abc123', description: 'asdsadasdsad', price: 34, thumbnail: 'www.nose.com/img1', stock: 3});
// pto.addProduct({name: 'ale2', price: 199, code: 'abc124', description: 'asdsadasdsad', price: 35, thumbnail: 'www.nose.com/img2', stock: 3});
// pto.addProduct({ name: 'ale3',price: 99, code: 'abc125', description: 'asdsadasdsad', price: 36, thumbnail: 'www.nose.com/img3', stock: 4});
// pto.addProduct({ name: 'ale4',price: 299, code: 'abc126', description: 'asdsadasdsad', price: 37, thumbnail: 'www.nose.com/img4', stock: 5});
// pto.addProduct({ name: 'ale5',price: 399, code: 'abc127', description: 'asdsadasdsad', price: 38, thumbnail: 'www.nose.com/img5', stock: 6});
// pto.addProduct({ name: 'ale6',price: 99, code: 'abc128', description: 'asdsadasdsad', price: 39, thumbnail: 'www.nose.com/img6', stock: 7});
// pto.addProduct({ name: 'ale7',price: 99, code: 'abc129', description: 'asdsadasdsad', price: 34, thumbnail: 'www.nose.com/img7', stock: 8});
// pto.addProduct({ name: 'ale8',price: 599, code: 'abc130', description: 'asdsadasdsad', price: 31, thumbnail: 'www.nose.com/img8', stock: 3});
// pto.addProduct({ name: 'ale9',price: 99, code: 'abc131', description: 'asdsadasdsad', price: 234, thumbnail: 'www.nose.com/img9', stock: 4});
// pto.addProduct({ name: 'ale10',price: 199, code: 'abc132', description: 'asdsadasdsad', price: 334, thumbnail: 'www.nose.com/img10', stock: 3});






// console.log(pto.getProducts());

//  pto.addProduct({name: 'ale3', price: 299, code: 'abc129', description: 'asdsadasdsad', price: 36, thumbnail: 'www.nose.com/img3', stock: 3});
//  console.log(pto.getProducts());
//pto.deleteProduct(2);
//console.log(pto.getProducts());
// console.log(pto.getProductById(2));
// pto.updateProductById(2, 'price', 45);
// console.log(pto.getProductById(2));
//export const Product_Manager = new ProductManager("./productos.json");

export default ProductManager;