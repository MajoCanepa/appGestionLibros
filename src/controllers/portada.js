import path from 'path'
import fs from 'fs';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const ctrlNuevaPortada = async (imagenPortada) => {
    try {
        const uploadPath =path.join(__dirname, '../../src/uploads', imagenPortada);
        const imagenPortadaPath = await imagenPortada.mv(uploadPath);
        if (!imagenPortadaPath) {
            return false
        };
        return imagenPortada.name
    } catch (error) {
        console.error('Error al subir portada', error);
    }
}

export const ctrlDestroyPortada = async (imagenPortada) => {
    try {
        const imgPath = path.join(__dirname, '../../src/uploads', imagenPortada);
        fs.unlink(imgPath);
        return true
    } catch (error) {
        console.error('Error al eliminar portada', error);
    }
}

