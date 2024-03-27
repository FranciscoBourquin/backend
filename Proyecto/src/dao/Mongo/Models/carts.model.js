import mongoose from "mongoose";

const cartsColl = "carts";
const cartsSchema = new mongoose.Schema({
    products: []
})

export const cartsModel = mongoose.model(cartsColl, cartsSchema);
