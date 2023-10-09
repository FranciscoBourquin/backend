import mongoose from "mongoose";

const productsColl = "products";

const productsSchema = new mongoose.Schema({
    title: {required: true, type: String},
    description: {required:true, type: String},
    price: {required: true, type: Number},
    stock: {required: true, type: Number},
    code: String,
    thumbnail: String
});

export const productsModel = mongoose.model(productsColl, productsSchema);
