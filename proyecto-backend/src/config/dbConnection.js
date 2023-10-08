import mongoose from "mongoose";

export const connectDB = async() => {
    try {

        await mongoose.connect("mongodb+srv://franbourquin89:Umee4PfDvSsLVEle@francluster.0fwaxum.mongodb.net/e-commerce?retryWrites=true&w=majority");

        console.log("Conexión a la base de datos exitosa");

    } catch (error) {
        console.log(`Error al conectarse a la base de datos: ${error.message}`);
    }
}
