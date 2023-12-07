import mongoose from "mongoose";
import { config } from "./config.js";

export const connectDB = async() => {
    try {

        await mongoose.connect(config.mongo.url);

        console.log("Conexión a la base de datos exitosa");

    } catch (error) {
        console.log(`Error al conectarse a la base de datos: ${error.message}`);
    }
}
