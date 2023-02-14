import fs from 'fs';

class ProductManager {
    constructor() {
        this.products = [];
        this.path = "./productos.json";
        this.id = 0;
    }

    addProduct = (product) => {
        if (
            !product.name ||
            !product.price ||
            !product.category ||
            !product.code ||
            !product.description ||
            !product.thumbnail ||
            !product.stock ||
            !product.status 
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

export default ProductManager;