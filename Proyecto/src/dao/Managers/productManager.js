import fs from "fs";

export class ProductManager {
    constructor(path) {
        this.path = path;
        this.products = [];
        this.idCounter = 0;

        if (fs.existsSync(this.path)) {
            try {
                const data = fs.readFileSync(this.path, "utf8");
                this.products = JSON.parse(data);
                if (this.products.length > 0) {
                    const maxId = this.products.reduce((max, product) => Math.max(max, product.id), 0);
                    this.idCounter = maxId;
                } else {
                    console.log('No hay productos existentes.');
                }
            } catch (error) {
                console.error(`Error al cargar productos: ${error}`);
                throw new Error('No se pudo cargar el archivo de productos.');
            }
        }
    }

    async getProducts() {
        try {
            const data = await fs.promises.readFile(this.path, "utf8");
            return JSON.parse(data);
        } catch (error) {
            console.error(`Error al obtener productos: ${error}`);
            throw new Error('No se pudieron obtener los productos.');
        }
    }

    async getProductById(id) {
        try {
            const data = await fs.promises.readFile(this.path, "utf8");
            const products = JSON.parse(data);
            const product = products.find(product => product.id === id);
            if (!product) {
                throw new Error(`No se encontró ningún producto con el ID ${id}.`);
            }
            return product;
        } catch (error) {
            console.error(`Error al obtener producto por ID: ${error}`);
            throw new Error(`No se pudo obtener el producto con el ID ${id}.`);
        }
    }

    async addProduct(productInfo) {
        try {
            const { title, description, price, thumbnail, code, stock } = productInfo;

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
                await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2), "utf8");
                console.log(`Producto ${title} agregado exitosamente`);
                return newProduct;
            } else {
                throw new Error(`El producto ${title} que intentas agregar ya existe`);
            }
        } catch (error) {
            console.error(`Error al agregar producto: ${error}`);
            throw error;
        }
    }

    async updateProductById(id, updatedField) {
        try {
            const data = await fs.promises.readFile(this.path, "utf8");
            let products = JSON.parse(data);
            const productIndex = products.findIndex(product => product.id === id);
            if (productIndex !== -1) {
                products[productIndex] = {
                    ...products[productIndex],
                    ...updatedField
                };
                await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
                console.log(`Producto con ID ${id} actualizado exitosamente`);
                console.log(JSON.stringify(products[productIndex], null, 2));
                return products[productIndex];
            } else {
                throw new Error(`No se encontró ningún producto con el ID ${id}`);
            }
        } catch (error) {
            console.error(`Error al actualizar producto por ID: ${error}`);
            throw error;
        }
    }

    async deleteProductById(id) {
        try {
            const data = await fs.promises.readFile(this.path, "utf8");
            let products = JSON.parse(data);
            const newProducts = products.filter(product => product.id !== id);
            if (newProducts.length === products.length) {
                throw new Error(`No se encontró ningún producto con el ID ${id}`);
            }
            await fs.promises.writeFile(this.path, JSON.stringify(newProducts, null, 2));
            console.log(`Producto con ID ${id} eliminado exitosamente`);
        } catch (error) {
            console.error(`Error al eliminar producto por ID: ${error}`);
            throw error;
        }
    }
}
