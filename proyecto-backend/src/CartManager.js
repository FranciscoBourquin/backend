import { readFile, writeFile } from 'fs/promises';

class CartManager {
  constructor(productFilePath, cartFilePath) {
    this.productFilePath = productFilePath;
    this.cartFilePath = cartFilePath;
  }

  async readProducts() {
    try {
      const data = await readFile(this.productFilePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      throw error;
    }
  }

  async readCart() {
    try {
      const data = await readFile(this.cartFilePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      // Si el archivo no existe o no se puede leer, se crea un carrito vacío.
      return [];
    }
  }

  async writeCart(cart) {
    try {
      await writeFile(this.cartFilePath, JSON.stringify(cart, null, 2));
    } catch (error) {
      throw error;
    }
  }

  async addProductById(productId) {
    const products = await this.readProducts();
    const product = products.find((p) => p.id === productId);

    if (product) {
      const cart = await this.readCart();
      cart.push(product);
      await this.writeCart(cart);
      console.log(`Producto con ID ${productId} agregado al carrito.`);
    } else {
      console.log(`El producto con ID ${productId} no existe.`);
    }
  }

  async deleteProductById(productId) {
    const cart = await this.readCart();
    const updatedCart = cart.filter((product) => product.id !== productId);

    if (cart.length !== updatedCart.length) {
      await this.writeCart(updatedCart);
      console.log(`Producto con ID ${productId} eliminado del carrito.`);
    } else {
      console.log(`El producto con ID ${productId} no está en el carrito.`);
    }
  }

  async getCart() {
    return await this.readCart();
  }
}

const cartManager = new CartManager('products.json', 'cart.json');

// Ejemplo de uso:
(async () => {
  // Agregar productos al carrito por ID
  await cartManager.addProductById(1);
  await cartManager.addProductById(2);

  // Mostrar el contenido del carrito
  const cartContents = await cartManager.getCart();
  console.log('Contenido del carrito:', cartContents);

  // Eliminar un producto del carrito por ID
  await cartManager.deleteProductById(1);

  // Mostrar el contenido del carrito después de eliminar un producto
  const updatedCartContents = await cartManager.getCart();
  console.log('Contenido del carrito actualizado:', updatedCartContents);
})();

export default CartManager
