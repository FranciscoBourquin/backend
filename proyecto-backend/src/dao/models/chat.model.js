import mongoose from "mongoose";

const chatColl = "messages";
const chatSchema = new mongoose.Schema({
    user: {type:String, required:true},
    message: {type:String}
});

export const chatModel = mongoose.model(chatColl, chatSchema)
