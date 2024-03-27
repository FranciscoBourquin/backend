import { cartsModel } from "../Models/carts.model.js";

export class MongoCartsManager {
    constructor(){
        this.model = cartsModel
    }

    createCart = async()=>{
        try {
            const newCart = await this.model.create();
            return newCart;
        } catch (error) {
            throw new Error(`No se pudo crear el carrito: ${error.message}`)
        }
    }
    getCarts = async()=> {
        try {
            const carts = await this.model.find();
            return carts;
        } catch (error) {
            throw new Error(`No se pudieron encontrar los carritos: ${error.message}`)
        }
    }
    getCartById = async(cid)=>{
        try {
            const cart = await this.model.findById(cid);
            return cart;
        } catch (error) {
            throw new Error(`No se pudo encontrar el carrito con ID ${cid}: ${error.message}`)
        }
    }
    updateCartById = async(cid, updatedCartInfo)=>{
        try {
            const updatedCart = await this.model.findByIdAndUpdate(cid, updatedCartInfo);
            return updatedCart;
        } catch (error) {
            throw new Error(`No se pudo actualizar la información del carrito con ID ${cid}: ${error.message}`)
        }
    }
    deleteCartById = async(cid)=>{
        try {
            await this.model.findByIdAndDelete(cid);
            return `Se eliminó el carrito con ID ${cid}`
        } catch (error) {
            throw new Error(`No se pudo eliminar el carrito con ID ${cid}: ${error.message}`)
        }
    }
}
