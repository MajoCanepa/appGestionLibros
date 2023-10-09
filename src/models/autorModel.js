import { model, Schema } from 'mongoose';

const autorSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    biografia: {
        type: String,
        required: true
    },
    libros: [{
        type: Schema.Types.ObjectId,
        ref: "Libro",
        required: true
        
    }]
},{
    timestamps: true,
    versionKey: false
})

const AutorModel = model('Autor', autorSchema)

export { AutorModel }