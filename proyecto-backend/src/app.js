import express from 'express';
import ProductManager from './ProductManager.js';

const app = express();
const port = 8080;

const productManager = new ProductManager('./products.json');

app.listen(port, () => {
  console.log('Servidor en línea!');
});

// La ruta /products devuelve todos los productos o la cantidad que se establezca en limit
app.get('/products', async (req, res) => {
    const limit = req.query.limit;
    const products = await productManager.getProducts();

    const limitedProducts = limit ? products.slice(0, limit) : products;

    res.send(limitedProducts);
  });

  //Se devuelve solo el producto especificado en el pid
  app.get("/products/:pid", async (req, res) => {
    const id = parseInt(req.params.pid);
    const product = await productManager.getProductById(id);
    product ? res.send(product) : res.send("Producto no encontrado");
  });


