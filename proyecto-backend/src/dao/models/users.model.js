import mongoose from "mongoose";

const usersColl = "users";
const usersSchema = new mongoose.Schema({
    name: {tyepe: String, required: true},
    last_name: String,
    email: {required: true, unique:true, type: String},
    password: {required: true, unique: true, type:String },
    role: {type:String, enum: ["user", "admin"], default: "user"}
});

export const usersModels = mongoose.model(usersColl, usersSchema);
