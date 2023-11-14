import mongoose from "mongoose";

const loginColl = "login";

const loginSchema = new mongoose.Schema( {
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, unique: true}
});

export const loginModel = mongoose.model(loginColl, loginSchema)


