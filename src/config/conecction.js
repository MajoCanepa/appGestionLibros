import mongoose from 'mongoose';

export const connectMongoDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/db_libros');
        console.log('MongoDB conectado');
    } catch (error) {
        console.error(`Error de conexión: ${error}`);
        throw error
    }
}