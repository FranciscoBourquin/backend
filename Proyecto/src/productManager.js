//Francisco Bourquin Backend Comision #53110
const fs = require("fs");

class ProductManager {
    constructor() {
        this.products = [];
        this.productIdCounter = 1;
        this.path = "./products.json";
    }

    //Agregar un nuevo producto
    addProduct(title, description, price, thumbnail, code, stock) {
        const existingProduct = this.products.find((product) => {
            return (
                product.title === title &&
                product.description === description &&
                product.price === price &&
                product.thumbnail === thumbnail &&
                product.code === code &&
                product.stock === stock
            );
        });

        //Validamos que no se repita la información
        if (!existingProduct || !fs.existsSync(this.path)) {
            const newProduct = {
                id: this.productIdCounter++,
                title,
                description,
                price,
                thumbnail,
                code,
                stock
            };
            this.products.push(newProduct);
            fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2)); // Guardamos productos después de agregar uno nuevo
            console.log("Producto agregado correctamente.");
        } else {
            console.log("Ya existe un producto con la misma información. No se agregó el producto.");
        }
    }

    // Mostramos todos los productos
    getProducts() {
        try {
            const data = fs.readFileSync(this.path, 'utf8');
            console.log("Lista de Productos:");
            console.log(data);
        } catch (error) {
            console.log("No se pudo cargar el archivo de productos.");
        }
    }

    // Buscamos un producto por su ID
    getProductById(id) {
        const product = this.products.find((p) => p.id === id);
        if (product) {
            console.log(`Información del Producto con ID ${id}:`);
            console.log(product);
        } else {
            console.log(`No se encontró ningún producto con el ID ${id}.`);
        }
    }

    // Actualizamos un producto por su ID
    updateProductById(id, newData) {
        const index = this.products.findIndex(p => p.id === id);
        if (index !== -1) {
            this.products[index] = { ...this.products[index], ...newData };
            fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2)); // Guardamos productos después de actualizar uno
            console.log(`Producto con ID ${id} actualizado correctamente.`);
        } else {
            console.log(`No se encontró ningún producto con el ID ${id}. No se realizó ninguna actualización.`);
        }
    }

    // Eliminamos un producto por su ID
 deleteProductById(id) {
  // Filtramos el arreglo para obtener solo los productos que no coincidan con el ID especificado
  const filteredProducts = this.products.filter(product => product.id !== id);

  // Actualizamos el arreglo con los productos filtrados
  this.products = filteredProducts;

  // Guardamos los cambios en el archivo JSON
  fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));

  // Mostramos un mensaje de confirmación
  console.log(`Se eliminó el producto con ID ${id}`);
}

}

const manager = new ProductManager();
//Agregamos productos
manager.addProduct("Celular1", "Descripcion1", 20.99, "foto1.jpg", "pc01", 10);
manager.addProduct("Celular2", "Descripcion2", 21.99, "foto2.jpg", "pc02", 11);
manager.addProduct("Celular3", "Descripcion3", 22.99, "foto3.jpg", "pc03", 12);

// Mostramos el array con 3 productos
manager.getProducts();

// Actualizamos el producto con id 2
manager.updateProductById(2, { title: "Nuevo Título", price: 25.99 });

// Eliminamos el producto con id 1
manager.deleteProductById(1);

// Mostramos el array actualizado
manager.getProducts();
