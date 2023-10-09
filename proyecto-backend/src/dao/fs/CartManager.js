import { readFile, writeFile, stat } from 'fs/promises';
import ProductManager from './ProductManager.js';

class CartManager {
  constructor(cartFilePath) {
    this.cartFilePath = cartFilePath;
    this.productManager = new ProductManager('src/products.json');
    this.initCartFile();
  }

  async initCartFile() {
    // Verifica si el archivo 'carts.json' existe antes de la inicialización.
    try {
      await stat(this.cartFilePath);
    } catch (error) {
      // Si el archivo 'carts.json' no existe, crea un array vacío.
      await this.writeCarts([]);
    }
  }

  async readCarts() {
    try {
      const data = await readFile(this.cartFilePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      // Si el archivo no existe o no se puede leer, devuelve un array vacío.
      return [];
    }
  }

  async writeCarts(carts) {
    try {
      await writeFile(this.cartFilePath, JSON.stringify(carts, null, 2));
    } catch (error) {
      throw error;
    }
  }

  async generateUniqueCartId() {
    const carts = await this.readCarts();
    let cartId = 1;

    // Encuentra el último ID de carrito utilizado y genera uno nuevo único.
    if (carts.length > 0) {
      const cartIds = carts.map(cart => cart.id);
      cartId = Math.max(...cartIds) + 1;
    }

    return cartId;
  }

  async createCart() {
    const cartId = await this.generateUniqueCartId();
    const carts = await this.readCarts();

    const newCart = { id: cartId, products: [] };
    carts.push(newCart);

    await this.writeCarts(carts);

    return cartId;
  }

  async getCartProducts(cartId) {
    const carts = await this.readCarts();
    const cart = carts.find(cart => cart.id === cartId);
    return cart ? cart.products : [];
  }

  async addProductToCart(cartId, productId) {
    const carts = await this.readCarts();

    const cart = carts.find(cart => cart.id === cartId);

    if (!cart) {
      throw new Error(`El carrito con ID ${cartId} no existe.`);
    }

    const product = await this.productManager.getProductById(productId);

    if (!product) {
      throw new Error(`El producto con ID ${productId} no existe.`);
    }

    // Verifica si el producto ya existe en el carrito.
    const cartProduct = cart.products.find(item => item.id === productId);

    if (cartProduct) {

      cartProduct.quantity += 1;

    } else {

      cart.products.push({ id: productId, quantity: 1 });
    }

    await this.writeCarts(carts);
  }
}

export default CartManager;
