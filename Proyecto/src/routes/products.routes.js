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
    const pid = parseInt(req.params.pid);

    if (pid) {

        const product = await manager.getProductById(pid);
        const productJson = JSON.stringify(product, null, 2);
        res.type("json").send(productJson);

    } else {
        res.send(`El producto con ID ${pid} no existe`)
    }
});

//Agregar producto
productsRouter.post("/", async(req, res)=> {
    const productInfo = req.body;
    const addProduct = await manager.addProduct(productInfo);
    res.json({message: "Producto agregado exitosamente"})
})
