import { productsModel } from "../Models/products.model.js";

export class MongoProductManager {
    constructor(){
        this.model = productsModel
    }

     createProduct = async(productInfo)=> {
        try {
            const newProduct = await this.model.create(productInfo);
            return newProduct;
        } catch (error) {
            throw new Error(`Ocurrió un error al agregar producto: ${error.message}`)
        }
     }

     getProducts = async ()=> {
        try {
            const products = await this.model.find();
            return products;
        } catch (error) {
            throw new Error (`Ha ocurrido un error al intentar obtener los productos: ${error.message}`)
        }
     }

     getProductById = async (pid)=> {
        try {
            const product = await this.model.findById(pid);
            return product;
        } catch (error) {
            throw new Error(`No se pudo obtener el producto con ID ${pid}: ${error.message}`)
        }
     }

     updateProductById = async (pid, updatedInfo)=> {
        try {
            const updatedProduct = await this.model.findByIdAndUpdate(pid, updatedInfo);
            return updatedProduct;
        } catch (error) {
            throw new Error(`No se pudo obtener el producto con ID ${pid}: ${error.message}`)
        }
     }

     deleteProductById = async (pid)=> {
        try {
            await this.model.findByIdAndDelete(pid)
            return `Se ha eliminado el producto con ID ${pid}`
        } catch (error) {
            throw new Error(`No se pudo encontrar el producto con ID ${pid}: ${error.message}`)
        }
     }
}
