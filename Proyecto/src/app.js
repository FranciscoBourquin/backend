import express from "express";
import { productsRouter } from "./routes/products.routes.js";
import { cartsRouter } from "./routes/carts.routes.js";

const app = express();
const port = 8080;

//Para poder procesar respuestas en fomato JSON
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.listen(port, ()=> console.log(`Servidor escuchando en el puerto ${port}`));

//Rutas
app.get("/", (req, res)=> {

    res.send("<h1>Página de inicio</h1>")
});

//Conexión con router de productos
app.use("/api/products", productsRouter);

//Conexion con router de carritos
app.use("/api/carts", cartsRouter);
