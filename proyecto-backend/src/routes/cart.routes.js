import { Router } from "express";
import CartManager from "../CartManager.js";

const router = Router();

const cartManager = new CartManager("src/carts.json");

// Crea un nuevo carrito
router.post("/", async (req, res) => {
  try {
    const cartId = await cartManager.createCart();
    res.json({ cartId });
  } catch (error) {
    console.error("Error al crear un carrito:", error.message);
    res.status(500).json({ error: "No se pudo crear el carrito" });
  }
});

// Obtiene los productos del carrito con el id especificado
router.get("/:cid", async (req, res) => {
  const cid = parseInt(req.params.cid);

  try {
    const products = await cartManager.getCartProducts(cid);
    res.json({ products });
  } catch (error) {
    console.error(`Error al obtener los productos del carrito: ${error.message}`);
    res.status(500).json({ error: "No se pudo obtener los productos del carrito" });
  }
});

// Agrega un producto al carrito recién creado
router.post("/:cid/products/:pid", async (req, res) => {
  const cid = parseInt(req.params.cid);
  const pid = parseInt(req.params.pid);

  try {
    await cartManager.addProductToCart(cid, pid);
    res.json({ message: `El producto con id ${pid} se agregó al carrito ${cid}` });
  } catch (error) {
    console.error(`Error al agregar el producto al carrito: ${error.message}`);
    res.status(500).json({ error: "No se pudo agregar el producto al carrito" });
  }
});


export { router as cartRouter };
