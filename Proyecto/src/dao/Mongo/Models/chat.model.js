import mongoose from "mongoose";

const chatColl = "messages"
const chatSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },

    messages: []
})

export const messagesModel = mongoose.model(chatColl, chatSchema)

