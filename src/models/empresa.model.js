import mongoose from 'mongoose'
const Schema = mongoose.Schema

let schema = new Schema({
	data_criacao: {type: String, required: true},
	hora_criacao: {type: String, required: true},
	data_inativacao: {type: String, required: false},
	hora_inativacao: {type: String, required: false},
	nome: {type: String, required: true, max: 150},
	empresa_tipo_id: {type: String, required: true},
	usuario_id: {type: String, required: true},
})

module.exports = mongoose.model('empresa', schema)
