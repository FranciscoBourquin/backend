import { Router } from "express";
import { cartModel } from "../dao/models/cart.model.js";
import { productsModel } from "../dao/models/products.model.js";

const router = Router();

// Crea un nuevo carrito
router.post("/", async (req, res) => {
  try {

        const cartInfo = req.body;
        const newCart = await cartModel.create(cartInfo);
        const cartId = newCart._id;
        res.json({message:`Se creo el carrito con id ${cartId}`});

  } catch (error) {

    console.error("Error al crear el carrito:", error.message);
    res.status(500).json({ error: "No se pudo crear el carrito" });
  }
});



// Obtiene los productos del carrito con el id especificado
router.get("/:cid", async (req, res) => {
  const cid = req.params.cid;

  try {
    const products = await cartModel.findById(cid).lean();
    res.json(products);
  } catch (error) {
    console.error(`Error al obtener los productos del carrito: ${error.message}`);
    res.status(500).json({ error: "No se pudo obtener los productos del carrito" });
  }
});

// Obtiene los todos los carritos creados
router.get("/", async (req, res) => {

  try {
    const carts = await cartModel.find().lean();
    res.json({carts});
  } catch (error) {
    console.error(`Error al obtener los carritos: ${error.message}`);
    res.status(500).json({ error: "No se pudieron obtener los carritos" });
  }
});

// Agrega un producto al carrito recién creado
router.post("/:cid/products/:pid", async (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;

  try {
    const cart = await cartModel.findOne({ _id: cid });

    if (!cart) {
      throw new Error(`Carrito con ID ${cid} no encontrado`);
    }

    const product = await productsModel.findOne({ _id: pid });

    if (!product) {
      throw new Error(`Producto con ID ${pid} no encontrado`);
    }

    // Verifica si el producto ya está en el carrito
    const existingProduct = cart.products.find(p => p._id.equals(pid));

    if (existingProduct) {
      // Si el producto ya está en el carrito, incrementa la cantidad
      existingProduct.quantity += 1;
    } else {
      // Si el producto no está en el carrito, cantidad es 1
      cart.products.push({ _id: pid, quantity: 1 });
    }

    // Guarda el carrito actualizado
    await cart.save();

    res.json({
      message: `El producto con id ${pid} se agregó al carrito ${cid}`,
      productInfo: product
    });
  } catch (error) {
    console.error(`Error al agregar el producto al carrito: ${error.message}`);
    res.status(500).json({ error: "No se pudo agregar el producto al carrito" });
  }
});

export { router as cartRouter };
