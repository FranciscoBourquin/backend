import mongoose from "mongoose";

const usersColl = "users";
const usersSchema = new mongoose.Schema({
    name: {type: String, required: true},
    last_name: String,
    email: {required: true, unique:true, type: String},
    password: {required: true, unique: true, type:String },
    role: {type:String, enum: ["user", "admin"], default: "user"}
});

export const usersModel = mongoose.model(usersColl, usersSchema);
