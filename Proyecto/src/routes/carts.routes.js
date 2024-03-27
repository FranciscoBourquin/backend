import { Router } from "express";
import { MongoCartsManager } from "../dao/Mongo/Managers/mongoCartsManager.js";

export const cartsRouter = Router();
const cartManager = new MongoCartsManager();

// Crear carrito
cartsRouter.post("/", async (req, res) => {
    try {
        console.log("Entrando en la ruta POST para crear un nuevo carrito...");
        const newCart = await cartManager.createCart();
        console.log("Nuevo carrito devuelto:", newCart);
        res.json({ message: "Carrito creado exitosamente", cart: newCart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al crear carrito" });
    }
});

//Obtener carritos
cartsRouter.get("/", async (req, res) => {
    try {
      const carts = await cartManager.getCarts();
      res.json(carts);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

//Obtener carrito por su id
cartsRouter.get("/:cid", async(req,res)=> {
try {
    const cid = parseInt(req.params.cid);
    const cart = await cartManager.getCartById(cid);
    res.json(cart);
} catch (error) {
    return `Ha ocurrido un error: ${error.message}`
}
})

//Agregar producto al carrito
cartsRouter.post("/:cid/products/:pid", async(req,res)=> {
  try {
    const cid = parseInt(req.params.cid);
    const pid = parseInt(req.params.pid);
    const addProduct = await cartManager.addProductToCart(cid, pid);
    console.log(JSON.stringify(addProduct));
    res.json({addProduct})
  } catch (error) {
    error.message
  }
});

