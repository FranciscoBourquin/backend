import mongoose from "mongoose";

export const connectDB = async()=> {
    try {
        await mongoose.connect("mongodb+srv://franbourquin89:nXnTaskfCTBMHwR8@fran2024.2kbny0g.mongodb.net/e-commerce?retryWrites=true&w=majority&appName=Fran2024");

        console.log("Base de datos conectada exitosamente");
    } catch (error) {
        console.log(`Ocurrió un error al conectar base de datos: ${error.message}`);
    }
}
