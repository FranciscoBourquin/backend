import { Router } from "express";
import { ProductManager } from "../productManager.js";

const manager = new ProductManager("./src/products.json");

export const productsRouter = Router();

//Todos los productos
productsRouter.get("/", async(req, res)=> {
    const limit = req.query.limit;
    if (limit) {
        const products = await manager.getProducts();
        const limitedProducts = products.slice(0, limit);
        const productsJson = JSON.stringify(limitedProducts, null, 2);
        res.send(productsJson);

    } else {
        const products = await manager.getProducts();
        const productsJson = JSON.stringify(products, null, 2);
        res.type("json").send(productsJson)
    }
});

//Encontrar producto por ID
productsRouter.get("/:pid", async(req, res)=> {
    try {
        const pid = parseInt(req.params.pid);

    if (pid) {

        const product = await manager.getProductById(pid);
        const productJson = JSON.stringify(product, null, 2);
        res.type("json").send(productJson);

    } else {
        res.send(`El producto con ID ${pid} no existe`)
    }
    } catch (error) {
        res.send(`Ha ocurrido un error: ${error.message}`)
    }
});

//Agregar producto
productsRouter.post("/", async(req, res)=> {
    try {
        const productInfo = req.body;
        const addProduct = await manager.addProduct(productInfo);
        res.json({message: "Producto agregado exitosamente"})
    } catch (error) {
        res.send(`Ha ocurrido un error: ${error.message}`)
    }
});

//Editar producto
productsRouter.put("/:pid", async(req, res)=> {
   try {
    const pid = parseInt(req.params.pid);
    const newInfo = req.body;
    const updatedProduct = await manager.updateProductById(pid, newInfo);
    res.json({updatedProduct: updatedProduct});
   } catch (error) {
    `Ha ocurrido un error ${error.message}`
   }
});

//Eliminar producto
productsRouter.delete("/:pid", async(req, res)=> {
    try {
        const pid = parseInt(req.params.pid);
        const deleteProduct = await manager.deleteProductById(pid);
        res.json({message: `Se ha eliminado el producto con ID ${pid}`})
    } catch (error) {
        `Ha ocurrido un error: ${error.message}`
    }
});
