import express, { json, urlencoded } from 'express';
import path from "path";
import {__dirname} from './dirname.js';
import { productsRouter } from './routes/products.routes.js';
import { cartRouter } from './routes/cart.routes.js';
import {engine} from "express-handlebars";
import {Server} from "socket.io";

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Dar acceso al usuario a la carpeta public
app.use(express.static(path.join( __dirname,"public")));

const port = 8080;

const httpServer =app.listen(port, () => {
  console.log('Servidor en línea!');
});

const socketServer = new Server(httpServer);

//Configuración handlebars
app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname,'./views'));

//routes
app.use("/api/products", productsRouter);
app.use("/api/carts", cartRouter);

//Conexión de socket
socketServer.on("connection", (socket) => {
  console.log("Cliente conectado", socket.id);
});


