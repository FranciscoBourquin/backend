import express from "express";
import {Server} from "socket.io";
import {engine} from "express-handlebars";
import { viewsRouter } from "./routes/views.routes.js";
import { productsRouter } from "./routes/products.routes.js";
import { cartsRouter } from "./routes/carts.routes.js";
import { ProductManager } from "./productManager.js";

const app = express();
const port = 8080;

//Para poder procesar respuestas en fomato JSON
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("./src/public"));

const hhttpServer = app.listen(port, ()=> console.log(`Servidor escuchando en el puerto ${port}`));

const socketServer = new Server(hhttpServer);

//Configuración hbs
app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', './src/views');

//Rutas

//Conexión con router de viws
app.use("/", viewsRouter)

//Conexión con router de productos
app.use("/api/products", productsRouter);

//Conexion con router de carritos
app.use("/api/carts", cartsRouter);

const manager = new ProductManager("./src/products.json");

socketServer.on("connection", async(socket)=> {
    console.log(`Cliente conectado con ID: ${socket.id}`);
    const products = await manager.getProducts();
    socket.emit("productsArray", {products});
})

