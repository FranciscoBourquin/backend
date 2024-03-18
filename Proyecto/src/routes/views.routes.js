import { Router } from "express";
import { ProductManager } from "../dao/Managers/productManager.js";

const roleAuth = (req, res, next) => {
    const role = req.query.role;
    if (role === "admin") {
        next();
    } else {
        res.send("No tienes permisos para acceder a esta pagina");
    }
}

const manager = new ProductManager("./src/products.json")
export const viewsRouter = Router();

viewsRouter.get("/", async(req, res)=> {
    try {
        const limit = req.query.limit;
        let products = await manager.getProducts();
        if (limit) {
            products = products.slice(0, limit);
        }
        res.render("home", {products});
    } catch (error) {
        console.error(`Error al obtener productos: ${error.message}`);
        res.render("home", {errorMessage: error.message});
    }

});

viewsRouter.get("/realtimeproducts",roleAuth, async(req, res)=> {
    try {
        let products = await manager.getProducts();
        res.render("products", {products})
    } catch (error) {
        res.render("products", {errorMessage: error.message})
    }
});
