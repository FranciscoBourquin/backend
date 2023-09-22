import express, { json, urlencoded } from 'express';
import {__dirname} from './dirname.js';
import path from "path";
import { productsRouter } from './routes/products.routes.js';
import { cartRouter } from './routes/cart.routes.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Dar acceso al usuario a la carpeta public
app.use(express.static(path.join("public")));

const port = 8080;

app.listen(port, () => {
  console.log('Servidor en línea!');
});

app.use("/api/products", productsRouter);
app.use("/api/carts", cartRouter);


