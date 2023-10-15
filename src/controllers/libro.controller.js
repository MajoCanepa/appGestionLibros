import { LibroModel } from '../models/libroModel.js'
import path from 'path'
import fs from 'fs';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import { ctrlNuevaPortada, ctrlDestroyPortada } from './portada.js';

export const ctrlAddLibro = async (req, res) => {
    try {
        const { titulo, genero, fechaPublicacion, autor } = req.body

        if (!req.files || !req.files.imagenPortada) {
            return res.status(400).json({ error: 'Imagen requerida' });
        }   
        const imagenPortada = req.files.imagenPortada

        if (typeof imagenPortada !== 'object') {
            return res.status(400).json({ error: 'La imagen de portada no es válida' });
        }
        
        const imgSave = await ctrlNuevaPortada(imagenPortada);

        const nuevoLibro= await LibroModel.create({
            titulo,
            genero,
            fechaPublicacion,
            autor,
            imagenPortada: imgSave
        });

        if(!nuevoLibro){
            await ctrlDestroyPortada(imgSave);
            return res.status(400).json({error: 'Libro no agregado'})
        }
        return res.status(200).json({message: 'Libro agregado', nuevoLibro})

    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Error al agregar el libro'});
    }
}

export const ctrlGetLibros = async (req, res) => {
    try {
        const libros = await LibroModel.find()
        if (!libros) {
            return res.status(404).json('No hay libros')
        }
        return res.status(200).json({message: 'Libros', libros})
    } catch (error) {
        console.error(error)
        return res.status(500).json({error: 'Error interno del servidor'})
    }
}

export const ctrlGetLibro = async (req, res) => {
    const { id } = req.params
    try {
        const libro = await LibroModel.findById(id)
        if (!libro) {
            return res.status(404).json('Libro no encontrado')
        }
        return res.status(200).json({message: 'Libro', libro})
    } catch (error) {
        console.error(error)
        return res.status(500).json({error: 'Error interno del servidor'})
    }
}

export const ctrlUpdateLibro = async (req, res) => {
    const { id } = req.params
    const { titulo, genero, fechaPublicacion, autor } = req.body
    let { imagenPortada } = req.files

    try {
        const imgSave = await ctrlNuevaPortada(imagenPortada);
        const libro =await LibroModel.findByIdAndUpdate(id,{titulo,genero,fechaPublicacion,autor,imagenPortada:imgSave})

        if (!libro) {
            return res.status(404).json('Libro no encontrado')
        }
        await ctrlDestroyPortada(libro.imagenPortada)
        return res.status(200).json({message: 'Libro actualizado', libro})

    } catch (error) {
        console.error(error)
        return res.status(500).json({error: 'Error interno del servidor'})
    }
}

export const ctrlDeleteLibro = async (req, res) => {
    const { id } = req.params
    try {
        const libro = await LibroModel.findByIdAndDelete(id)
        if (!libro) {
            return res.status(404).json('Libro no encontrado')
        }
        await ctrlDestroyPortada(libro.imagenPortada);
        return res.status(200).json({message: 'Libro eliminado', libro})
    } catch (error) {
        console.error(error)
        return res.status(500).json({error: 'Error interno del servidor'})
    }
}