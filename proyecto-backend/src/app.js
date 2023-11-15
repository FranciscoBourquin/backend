import express from 'express';
import { json, urlencoded } from 'express';
import path from 'path';
import { __dirname } from './dirname.js';
import session  from "express-session";
import MongoStore from "connect-mongo";
import { engine } from 'express-handlebars';
import { productsRouter } from './routes/products.routes.js';
import { cartRouter } from './routes/cart.routes.js';
import { chatRouter } from './routes/chat.routes.js';
import { sessionsRouter } from './routes/sessions.routes.js';
import { Server } from 'socket.io';
import { connectDB } from './config/dbConnection.js';

const app = express();
const port = 8080;

app.use(json());
app.use(urlencoded({ extended: true }));

//Acceso a la carpeta public
app.use(express.static(path.join(__dirname, 'public')));

//Configuración session y mongoStore
app.use(session({
    store: MongoStore.create({
                mongoUrl: "mongodb+srv://franbourquin89:Umee4PfDvSsLVEle@francluster.0fwaxum.mongodb.net/e-commerce?retryWrites=true&w=majority",
                ttl: 60000
    }),

    secret: "e-commerceCoder2023",
    resave: true,
    saveUninitialized: true

}))

//Configuración hbs
app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, './views'));

// Routes
app.use('/api/products', productsRouter);
app.use('/api/carts', cartRouter);
app.use('/api/chat', chatRouter);
app.use("/", sessionsRouter);

//Servidor websocket
const httpServer = app.listen(port, () => {
  console.log('Servidor en línea!');
});

const socketServer = new Server(httpServer);

const chat = [];

socketServer.on("connection", (socket)=> {
    console.log("Cliente conectado:", socket.id);
    //Enviamos los mensajes cuando el usuario se conecta
    socket.emit("chatHistory", chat)
    //Recibimos mensaje de los usuarios
    socket.on("chatMsg", (data)=> {
        chat.push(data);
        //Mandamos todos los mensajes de todos los usuarios (historial)
        socketServer.emit("chatHistory", chat)
    });
    //Enviamos notificación de usuario conectado a todos menos el que se acaba de conectar (broadcast)
    socket.on("userConnected", (user)=> {
        socket.broadcast.emit("newUserConnected", `El usuario ${user} se acaba de conectar`);
    })
});



// Conexión a la base de datos
connectDB();
