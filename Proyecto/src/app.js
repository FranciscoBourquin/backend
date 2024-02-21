import express from "express";
import { ProductManager } from "./productManager.js";

const manager = new ProductManager("./src/products.json");
const app = express();
const port = 8080;

app.listen(port, () => console.log(`Servidor escuchando en el puerto ${port}`));

app.get("/", (req, res) => {
    res.send("<h1>Página de inicio</h1>");
});

//Obtenemos todos los productos o la cantidad establecida en limit
app.get("/products", async (req, res) => {
    const limit = req.query.limit;
    if (limit) {
        const products = await manager.getProducts();
        const limitedProducts = products.slice(0, limit);
        const jsonOutput = JSON.stringify(limitedProducts, null, 2);
        res.type("json").send(jsonOutput);
    } else {
        const products = await manager.getProducts();
        const productsJson = JSON.stringify(products, null, 2);
        res.type("json").send(productsJson);
    }
});

//Obtenemos un producto por su id
app.get("/products/:pid", async(req,res)=> {
    const pid = parseInt(req.params.pid);
    if (pid) {
        const product = await manager.getProductById(pid);
        const productJson = JSON.stringify(product, null, 2);
        res.type("json").send(productJson)

    } else {
        res.send(`El producto con ID ${pid} no existe`)
    }
});

