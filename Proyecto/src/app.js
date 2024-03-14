import express from "express";
import path from "path";
import { __dirname } from "./utils.js";
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
app.use(express.static(path.join(__dirname, "public")));

const httpServer = app.listen(port, ()=> console.log(`Servidor escuchando en el puerto ${port}`));

const socketServer = new Server(httpServer);

//Configuración hbs
app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, "views"));

//Rutas

//Conexión con router de viws
app.use("/", viewsRouter)

//Conexión con router de productos
app.use("/api/products", productsRouter);

//Conexion con router de carritos
app.use("/api/carts", cartsRouter);

const manager = new ProductManager(path.join(__dirname, "products.json"));

socketServer.on("connection", async(socket)=> {
    console.log(`Cliente conectado con ID: ${socket.id}`);
    const products = await manager.getProducts();
    socket.emit("productsArray", products);

    //Recibimos producto a crear
    socket.on("addProduct", async (jsonData) => {
        const newProduct = await manager.addProduct(jsonData);
        const products = await manager.getProducts();
        socketServer.emit("productsArray", products);

       // Recibimos id de producto a eliminar
        socket.on("deleteProduct", async(productId)=> {
        console.log("Delete product event received on server:", productId);
        const deleteProduct = await manager.deleteProductById(productId);
        const products = await manager.getProducts();
        socketServer.emit("productsArray", products);
    });

    socket.on("disconnect", () => {
        console.log(`Cliente desconectado con ID: ${socket.id}`);
    });

})
})
