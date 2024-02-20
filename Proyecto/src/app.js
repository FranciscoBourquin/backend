import express from "express"

const app = express();
const port = 3000;

app.listen(port, ()=> console.log(`Servidor escuchando en el puerto ${port}`));

app.get("/", (req, res)=> {

    res.send("<h1>Página de inicio</h1>")
});
