import { Router } from "express";
import ProductManager from '../ProductManager.js';

const router = Router();

const admin = true;

const isAdmin = (req, res, next) => {
  if (admin) {
    next();

  } else {

    res.json({ message: "No tienes permiso para editar el producto" });
  }
};

const productManager = new ProductManager('./src/products.json');

// La ruta /products devuelve todos los productos o la cantidad que se establezca en limit
router.get('/', async (req, res) => {
    const limit = req.query.limit;
    const products = await productManager.getProducts();

    const limitedProducts = limit ? products.slice(0, limit) : products;

    res.send(limitedProducts);
  });

  //Se devuelve solo el producto especificado en el pid
  router.get("/:pid", async (req, res) => {
    const id = parseInt(req.params.pid);
    const product = await productManager.getProductById(id);
    product ? res.send(product) : res.send("Producto no encontrado");
  });

  //Se agrega un producto para editarlo y eliminarlo sin afectar el json original
  router.post("/", isAdmin, async (req, res)=> {

    try {

      const newProductInfo = req.body;

      await productManager.addProduct(newProductInfo);

      res.json({ message: "Producto agregado" });
    } catch (error) {
      res.json({ message: "Error al agregar el producto" });
    }
  });

  //Se edita el producto con el id especificado
  router.put("/:pid", isAdmin, async (req, res) => {
    const id = parseInt(req.params.pid);
    const newProductInfo = req.body;

    try {

      await productManager.editProductById(id, newProductInfo);

      res.json({ message: "Producto actualizado" });
    }
    catch (error) {

      res.json({ message: "Error al actualizar el producto" });
    }
  });

  //Se elimina el producto con el id especificado
  router.delete("/:pid", isAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.pid);
      const product = await productManager.getProductById(id);

      if (product) {

        await productManager.deleteProduct(id);
        res.json({ message: "El producto se ha eliminado correctamente" });
      } else {

        res.status(404).json({ message: "No se encontró el producto con el ID especificado" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error al eliminar el producto" });
    }
  });




export  {router as productsRouter};
