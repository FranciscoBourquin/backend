import { Router } from "express";
import { productsModel } from "../dao/models/products.model.js";

const router = Router();

const admin = true;

const isAdmin = (req, res, next) => {
  if (admin) {
    next();

  } else {

    res.json({ message: "No tienes permiso para editar el producto" });
  }
};


// La ruta /products devuelve todos los productos o la cantidad que se establezca en limit
router.get('/', async (req, res) => {
    const limit = req.query.limit;
    const products = await productsModel.find();

    const limitedProducts = limit ? products.slice(0, limit) : products;
    res.render("home",{limitedProducts});
  });

  //Se devuelve solo el producto especificado en el pid
  router.get("/:pid", async (req, res) => {
    const id = req.params.pid;
    const product = await productsModel.findById(id);
    product ? res.send(product) : res.send("Producto no encontrado");
  });

 // Se agrega uno o varios productos
router.post("/", isAdmin, async (req, res) => {
  try {

    const newProductsInfo = req.body;

    let productosCreados;

    if (Array.isArray(newProductsInfo)) {

      // Si es un array de productos
      const nuevosProductos = newProductsInfo.map(productInfo => new productsModel(productInfo));
      productosCreados = await Promise.all(nuevosProductos.map(producto => producto.save()));

    } else {

      // Si es un solo producto
      const nuevoProducto = new productsModel(newProductsInfo);
      productosCreados = [await nuevoProducto.save()];
    }

    res.json({ message: "Productos agregados correctamente", productos: productosCreados });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Error al agregar los productos" });
  }
});


  // Se edita el producto con el id especificado
router.put("/:pid", isAdmin, async (req, res) => {
  const id = req.params.pid;
  const newProductInfo = req.body;

  try {

    const productoActualizado = await productsModel.findByIdAndUpdate(id, newProductInfo, { new: true });

    if (productoActualizado) {
      res.json({ message: "Producto actualizado", producto: productoActualizado });
    } else {
      res.status(404).json({ message: "Producto no encontrado" });
    }
  } catch (error) {

    console.error(error.message);
    res.status(500).json({ message: "Error al actualizar el producto" });
  }
});


  // Se elimina el producto con el ID especificado
router.delete("/:pid", isAdmin, async (req, res) => {
  try {
    const id = req.params.pid;

    const resultado = await productsModel.findOneAndDelete({ _id: id });

    if (resultado) {
      res.json({ message: "El producto se ha eliminado correctamente", producto: resultado });
    } else {
      res.status(404).json({ message: "No se encontró el producto con el ID especificado" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Error al eliminar el producto" });
  }
});





export  {router as productsRouter};
