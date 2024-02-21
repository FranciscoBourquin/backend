import fs from "fs";

export class ProductManager {
    constructor(path) {
        this.path = path;
        this.products = [];
        this.idCounter = 0;
    }

    async addProduct(title, description, price, thumbnail, code, stock) {
        try {
            let products = [];
            if (fs.existsSync(this.path)) {
                const data = await fs.promises.readFile(this.path, "utf8");
                products = JSON.parse(data);
            }

            const existingProduct = products.find(p =>
                p.title === title &&
                p.description === description &&
                p.price === price &&
                p.thumbnail === thumbnail &&
                p.code === code &&
                p.stock === stock
            );

            if (!existingProduct) {
                const newProduct = {
                    id: ++this.idCounter,
                    title,
                    description,
                    price,
                    thumbnail,
                    code,
                    stock
                };

                products.push(newProduct);
                await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2), "utf8")
                    .catch(error => {
                        console.error(`Error al escribir el archivo de productos: ${error}`);
                    });
                console.log("Producto agregado exitosamente");
            } else {
                console.log("El producto que intentas agregar ya existe");
            }
        } catch (error) {
            console.error(`Error al agregar producto: ${error}`);
        }
    }


    async getProducts() {
        try {
            if (!fs.existsSync(this.path)) {
                console.log("El archivo no existe.");
                return [];
            }

            const data = await fs.promises.readFile(this.path, "utf8");
            this.products = JSON.parse(data);
            return this.products;
        } catch (error) {
            console.error(`Error al obtener productos: ${error}`);
            return [];
        }
    }

    async getProductById(id) {
        try {
            if (!fs.existsSync(this.path)) {
                console.log("El archivo no existe.");
                return null;
            }

            const data = await fs.promises.readFile(this.path, "utf8");
            this.products = JSON.parse(data);
            return this.products.find(product => product.id === id)|| `El producto com ID ${id} no existe`;
        } catch (error) {
            console.error(`Error al obtener producto por ID: ${error}`);

        }
    }

    async updateProductById(id, updatedField) {
        try {
            if (!fs.existsSync(this.path)) {
                console.log("El archivo no existe.");
                return;
            }

            const data = await fs.promises.readFile(this.path, "utf8");
            let products = JSON.parse(data);
            const productIndex = products.findIndex(product => product.id === id);
            if (productIndex !== -1) {
                products[productIndex] = {
                    ...products[productIndex],
                    ...updatedField
                };
                await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2), "utf8");
                console.log("Producto actualizado exitosamente");
            } else {
                console.log(`No se encontró ningún producto con el ID ${id}`);
            }
        } catch (error) {
            console.error(`Error al actualizar producto por ID: ${error}`);
        }
    }

    async deleteProductById(id) {
        try {
            if (!fs.existsSync(this.path)) {
                console.log("El archivo no existe.");
                return;
            }

            const data = await fs.promises.readFile(this.path, "utf8");
            let products = JSON.parse(data);
            const productIndex = products.findIndex(product => product.id === id);
            if (productIndex !== -1) {
                products.splice(productIndex, 1);
                await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2), "utf8");
                console.log(`Producto con ID ${id} eliminado exitosamente`);
            } else {
                console.log(`No se encontró ningún producto con el ID ${id}`);
            }
        } catch (error) {
            console.error(`Error al eliminar producto por ID: ${error}`);
        }
    }
}

// const manager = new ProductManager("./products.json");

// async function operations() {
//     try {
//         // Crear 11 productos
//         await manager.addProduct("Product1", "description1", 20, "thumbnail1", "PC1", 10);
//         await manager.addProduct("Product2", "description2", 20, "thumbnail2", "PC2", 10);
//         await manager.addProduct("Product3", "description3", 20, "thumbnail3", "PC3", 10);
//         await manager.addProduct("Product4", "description4", 20, "thumbnail4", "PC4", 10);
//         await manager.addProduct("Product5", "description5", 20, "thumbnail5", "PC5", 10);
//         await manager.addProduct("Product6", "description6", 20, "thumbnail6", "PC6", 10);
//         await manager.addProduct("Product7", "description7", 20, "thumbnail7", "PC7", 10);
//         await manager.addProduct("Product8", "description8", 20, "thumbnail8", "PC8", 10);
//         await manager.addProduct("Product9", "description9", 20, "thumbnail9", "PC9", 10);
//         await manager.addProduct("Product10", "description10", 20, "thumbnail10", "PC10", 10);
//         await manager.addProduct("Product11", "description11", 20, "thumbnail11", "PC11", 10);

//         // Mostrar los productos
//         console.log(await manager.getProducts());

//         // Mostrar el producto con ID 1
//         console.log(await manager.getProductById(1));

//         // Actualizar el producto con ID 2
//         await manager.updateProductById(2, { title: "Nuevo titulo para Product2" });

//         // Eliminar el producto con ID 11
//         await manager.deleteProductById(11);
//     } catch (error) {
//         console.error("Ha ocurrido un error:", error);
//     }
// }

// // Llamamos a la función operations
// operations();
