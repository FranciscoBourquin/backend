const fs = require('fs').promises;

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
    this.productIdCounter = 1;
  }

  async readFile() {
    try {
      const data = await fs.readFile(this.path, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      throw error;
    }
  }

  async writeFile(data) {
    try {
      await fs.writeFile(this.path, JSON.stringify(data, null, 2));
    } catch (error) {
      throw error;
    }
  }

  async addProduct(product) {
    const products = await this.readFile();
    if (!product.id) {
      product.id = this.productIdCounter;
      this.productIdCounter++;
    }
    products.push(product);
    await this.writeFile(products);
  }

  async getProducts() {
    const products = await this.readFile();
    return products;
  }

  async getProductById(id) {
    const products = await this.readFile();
    const product = products.find((p) => p.id === id);
    if (!product) {
      console.log("Not found");
    }
    return product || null;
  }

  async deleteProduct(id) {
    const products = await this.readFile();
    const updatedProducts = products.filter((p) => p.id !== id);
    await this.writeFile(updatedProducts);
    console.log(`Se ha eliminado el producto de id ${id}`);
  }
}

const productManager = new ProductManager('products.json');

//Agregamos los productos 1 y 2
(async () => {
  await productManager.addProduct({
    title: 'Producto 1',
    description: 'Descripción del Producto 1',
    price: 19.99,
    thumbnail: 'ruta/imagen1.jpg',
    code: 'P1',
    stock: 10,
  });

  await productManager.addProduct({
    title: 'Producto 2',
    description: 'Descripción del Producto 2',
    price: 29.99,
    thumbnail: 'ruta/imagen2.jpg',
    code: 'P2',
    stock: 5,
  });

  //Muestra todos los productos
  console.log(await productManager.getProducts());

  //Muestra el producto con ID 1
  console.log(await productManager.getProductById(1));

  //Arroja 'not found' porque el producto con ID 3 no existe
  console.log(await productManager.getProductById(3));

  //Borra el producto con ID 2
  await productManager.deleteProduct(2);
})();
