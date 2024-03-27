import { Router } from "express";
import { MongoProductManager } from "../dao/Mongo/Managers/mongoProductsManager.js";

const manager = new MongoProductManager();

export const productsRouter = Router();

// Todos los productos
productsRouter.get("/", async (req, res) => {
    try {
        const limit = req.query.limit;
        let products = await manager.getProducts();
        if (limit) {
            products = products.slice(0, limit);
        }
        res.json(products);
    } catch (error) {
        console.error(`Error al obtener productos: ${error}`);
        res.status(500).json({ error: error.message });
    }
});

// Encontrar producto por ID
productsRouter.get("/:pid", async (req, res) => {
    try {
        const pid = parseInt(req.params.pid);
        const product = await manager.getProductById(pid);
        res.json(product);
    } catch (error) {
        console.error(`Error al obtener producto por ID: ${error}`);
        res.status(500).json({ error: error.message });
    }
});

// Crear producto
productsRouter.post("/", async (req, res) => {
    try {
        const productInfo = req.body;
        const newProduct = await manager.createProduct(productInfo);
        res.status(201).json(newProduct);
    } catch (error) {
        console.error(`Error al agregar producto: ${error}`);
        res.status(500).json({ error: error.message });
    }
});

// Editar producto
productsRouter.put("/:pid", async (req, res) => {
    try {
        const pid = parseInt(req.params.pid);
        const newInfo = req.body;
        const updatedProduct = await manager.updateProductById(pid, newInfo);
        res.json(updatedProduct);
    } catch (error) {
        console.error(`Error al editar producto: ${error}`);
        res.status(500).json({ error: error.message });
    }
});

// Eliminar producto
productsRouter.delete("/:pid", async (req, res) => {
    try {
        const pid = parseInt(req.params.pid);
        await manager.deleteProductById(pid);
        res.json({ message: `Se ha eliminado el producto con ID ${pid}` });
    } catch (error) {
        console.error(`Error al eliminar producto: ${error}`);
        res.status(500).json({ error: error.message });
    }
});
