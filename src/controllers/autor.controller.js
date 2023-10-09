import { AutorModel } from '../models/autorModel.js'

export const ctrlAddAutor = async (req, res) => {
    const { nombre, apellido, biografia } = req.body
    try {
        const autor = await AutorModel.create({nombre, apellido, biografia})
        return res.json({message: 'Autor creado', autor})
    } catch (error) {
        console.error(error)
    }

   
}

export const ctrlGetAutores = async (req, res) => {
    try {
        const autores = await AutorModel.find()

        if (!autores) {
            return res.status(404).json('No hay autores')
        }
        return res.json({message: 'Autores', autores})
    } catch (error) {
        console.error(error)
    }
}

export const ctrlGetAutor = async (req, res) => {
    const { id } = req.params

    try {
        const autor = await AutorModel.findById(id)

        if(!autor) {
            return res.status(404).json('Autor no encontrado')
        }
        return res.json({message: 'Autor', autor})
    } catch (error) {
        console.error(error)
    }
}

export const ctrlUpdateAutor = async (req, res) => {
    const { id } = req.params
    const { nombre, apellido, biografia } = req.body

    try {
        const autor = await AutorModel.findByIdAndUpdate(id, req.body, {new: true})
        if (!autor) {
            return res.status(404).json('Autor no encontrado')
        }
        return res.json({message: 'Autor actualizado', autor})
    } catch (error) {
        console.error({error: 'Error al actualizar el autor'})
    }
}

export const ctrlDeleteAutor = async (req, res) => {
    const { id } = req.params

    try {
        const autor = await AutorModel.findByIdAndDelete(id)
        if (!autor) {
            return res.status(404).json('Autor no encontrado')
        }
        return res.json({message: 'Autor eliminado', autor})
    } catch (error) {
        console.error(error)
    }
}