import { Schema, model } from 'mongoose';

const libroSchema = new Schema({
    titulo: {
        type: String,
        required: true
    },
    genero: {
        type: String,
    },
    fechaPublicacion: {
        type: Number,
    },
    imagenPortada: {
        type: String,
    },
    autor: {
        type: Schema.Types.ObjectId,
        ref: "Autor",
        required: true
    }
},{
    timestamps: true,
    versionKey: false
})

const LibroModel = model('Libro', libroSchema)

export { LibroModel }