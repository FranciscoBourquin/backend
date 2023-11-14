import mongoose from "mongoose";

const signupColl = "signup";
const signupSchema = new mongoose.Schema({
    name: {type: String, required: true},
    last_name: String,
    email: {required: true, unique:true, type: String},
    password: {required: true, unique: true, type:String },
});

export const signupModel = mongoose.model(signupColl, signupSchema);
