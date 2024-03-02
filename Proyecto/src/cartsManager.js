
import fs from 'fs';
import {ProductManager} from "./productManager.js";

const productManager = new ProductManager("./src/products.json");

export class CartsManager {
  constructor(path) {
    this.filePath = path;
    this.carts = [];
    this.cartId = 1;
    this.productQuantity = 1
  }

  async createCart() {
    try {
      if (fs.existsSync(this.filePath)) {
        const cartTxt = await fs.promises.readFile(this.filePath, { encoding: "utf-8" });
        const cartJson = JSON.parse(cartTxt, null, 2);
        this.carts = cartJson;

        if (this.cartId === this.carts.length) {
          this.cartId++;
        }
      }

      const newCart = {
        id: this.cartId,
        products: []
      };

      this.carts.push(newCart);
      const updatedCarts = await fs.promises.writeFile(this.filePath, JSON.stringify(this.carts, null, 2));

      return newCart;
    } catch (error) {
      console.error(`Error al crear carrito: ${error.message}`);
      return { error: error.message };
    }
  }

  getCarts = async() => {
    try {
      if (fs.existsSync(this.filePath)) {
        const cartsTxt = await fs.promises.readFile(this.filePath, {encoding: "utf-8"});
        const cartsJson = JSON.parse(cartsTxt, null, 2);
        return cartsJson
      } else {
        return "El archivo de carritos no existe"
      }
    } catch (error) {
      return `Ocurrió un error al intentar recuperar los carritos: ${error.message}`
    }
  }

  getCartById = async(cid)=> {

    try {
      if ( fs.existsSync(this.filePath)) {

        const cartsTxt = await fs.promises.readFile(this.filePath, {encoding: "utf-8"});
        const cartsJson = JSON.parse(cartsTxt, null, 2);
        const findCart = cartsJson.find(cart => cart.id === cid);

        if (findCart) {
          return findCart
        } else {
          return `El carrito con ID ${cid} no existe`
        }

      } else {
        return "El archivo de carritos no existe";
      }
    } catch (error) {
      return `Ha ocurrido un error al intentar encontrar el carrito: ${error.message}`
    }

  }
  addProductToCart = async (cid, pid) => {
    try {
        const product = await productManager.getProductById(pid);

        if (fs.existsSync(this.filePath)) {
            const cartsTxt = await fs.promises.readFile(this.filePath, { encoding: "utf-8" });
            this.carts = JSON.parse(cartsTxt, null, 2);

            const cart = this.carts.find(cart => cart.id === cid);

            if (cart) {
                const existingProduct = cart.products.find(p => p.id === pid);

                if (existingProduct) {

                    existingProduct.quantity++;
                    const currentQuantity = existingProduct.quantity;
                    await fs.promises.writeFile(this.filePath, JSON.stringify(this.carts, null, 2), { encoding: "utf-8" });
                    return `Producto con ID ${pid} agregado al carrito con ID ${cid}. Ahora tienes ${currentQuantity} productos en el carrito.`;

                } else {
                    cart.products.push({ id: pid, quantity: 1 });
                    await fs.promises.writeFile(this.filePath, JSON.stringify(this.carts, null, 2), { encoding: "utf-8" });
                    return `Producto con ID ${pid} agregado al carrito con ID ${cid}. Ahora tienes 1 producto en el carrito.`;
                }
            } else {
                return `No se encontró el carrito con ID ${cid}`;
            }
        } else {
            return "El archivo de carritos no existe";
        }

    } catch (error) {
        return `Ha ocurrido un error: ${error.message}`;
    }
}

}
