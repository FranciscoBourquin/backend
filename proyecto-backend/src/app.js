import express from 'express';
import ProductManager from './ProductManager.js';

const app = express();
const port = 8080;

const productManager = new ProductManager('./products.json');

app.listen(port, () => {
  console.log('Servidor en línea!');
});

// La ruta /products devuelve todos los productos
app.get('/products', async (req, res) => {
    const products = await productManager.getProducts();
    res.send(products);
  });
