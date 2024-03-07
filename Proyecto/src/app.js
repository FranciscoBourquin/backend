import express from "express";
import {engine} from "express-handlebars";
// import {Server} from "socket.io;"
import { viewsRouter } from "./routes/views.routes.js";
import { productsRouter } from "./routes/products.routes.js";
import { cartsRouter } from "./routes/carts.routes.js";

const app = express();
const port = 8080;

//Para poder procesar respuestas en fomato JSON
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.listen(port, ()=> console.log(`Servidor escuchando en el puerto ${port}`));

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


