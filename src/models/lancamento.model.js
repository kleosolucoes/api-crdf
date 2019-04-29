import mongoose from 'mongoose'

const Schema = mongoose.Schema

let schema = new Schema({
	data_criacao: {type: String, required: true},
	hora_criacao: {type: String, required: true},
	data_inativacao: {type: String, required: false},
	hora_inativacao: {type: String, required: false},
	data: {type: String, required: true},
	valor: {type: Number, required: true,},
	taxa: {type: Number, required: false,},
	categoria_id: {type: String, required: true},
	usuario_id: {type: String, required: true},
	empresa_id: {type: String, required: true},
	descricao: {type: String, required: false},
})

module.exports = mongoose.model('lancamento', schema)
