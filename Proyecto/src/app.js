import express from "express";
import {ProductManager} from "./productManager.js";

const path = "./products.json";
const manager = new ProductManager(path);

const app = express();
const port = 8080;

app.listen(port, ()=> console.log(`Servidor escuchando en el puerto ${port}`));

app.get("/", (req, res)=> {

    res.send("<h1>Página de inicio</h1>")
});

app.get("/products", async (req,res) => {
    const limit = req.query;
    if (limit) {
        const limitedProducts = await manager.getProducts().slice(0, limit)
        res.send(limitedProducts)

    } else {
        const products = await manager.getProducts();
        res.send(products)
    }
})
