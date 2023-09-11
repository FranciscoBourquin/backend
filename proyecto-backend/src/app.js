import express from "express";
import ProductManager from "./ProductManager.js";

const app = express();

const port = 8080;

app.listen(port, () => console.log("Servidor en línea!"));

//La ruta /products devuelve todos los productos
app.get("/products", (req, res) => {
    res.send(ProductManager.getProducts())
})

