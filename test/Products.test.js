import mongoose from "mongoose";
import Products from "../dao/productsDao.js";
import Assert from 'assert';

mongoose.connect('mongodb+srv://BellaDev:aNabella1702@cluster0.rvjajgv.mongodb.net/ecommerce-test?retryWrites=true&w=majority')
const assert = Assert.strict;

describe('Pruebas al modulo de productos dao', function() {
    before(async function() {
        console.log('Pruebas Productos');
    });

    beforeEach(async function() {
         mongoose.connection.collections.products.drop();
    });

    after('[after]', function() {
        console.log('Despues de todas las pruebas');
    });
    
    afterEach('[afterEach]',function(){
        console.log('Despues de cada prueba');
    });

    it('Debe crear un producto', async function() {
        let result = await Products.createProduct({
            name: 'Polera',
            price: 100,
            code: 10,
            description: 'Ropa',
            stock: 4,
            category: 'Indumentaria'
        });
        assert.ok(result._id);
        assert.strictEqual(result.name, 'Polera')
    });

    it('Debe retornar todos los productos', async function() {
        const result = await Products.getProducts();

        assert.strictEqual(Array.isArray(result), true);
        assert.deepStrictEqual(result, []);

    });

    it('Debe retornar todos los productos', async function() {
        const result = await Products.createProduct({
            name: 'Polera',
            price: 100,
            code: 12,
            description: 'Ropa',
            stock: 4,
            category: 'Indumentaria'
        });
        const product = await Products.getProductById(result._id);
        //console.log(product);
        assert.strictEqual(typeof product, 'object');
        
    });

    it('Debe eliminar un producto por id', async function() {
        const result = await Products.createProduct({
            name: 'Polera',
            price: 100,
            code: 12,
            description: 'Ropa',
            stock: 4,
            category: 'Indumentaria'
        });
         await Products.deleteProductById(result._id);
        
         //console.log(product);        
    });

    it('Debe actualizar un producto por id', async function() {
        const result = await Products.createProduct({
            name: 'Polera',
            price: 100,
            code: 12,
            description: 'Ropa',
            stock: 4,
            category: 'Indumentaria'
        });

        const data = {
            name: 'Nuevo Producto',
            price: 500
        }

        await Products.updateProductById(result._id, data);

        const product = await  Products.getProductById(result._id);
        console.log(product);
         assert.ok(product._id);
         assert.strictEqual(typeof product, 'object');
         assert.strictEqual(product.name, data.name);
        
    });
} );