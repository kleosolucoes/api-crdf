import mongoose from 'mongoose'

const Schema = mongoose.Schema

let schema = new Schema({
	data_criacao: {type: String, required: true},
	hora_criacao: {type: String, required: true},
	data_inativacao: {type: String, required: false},
	hora_inativacao: {type: String, required: false},
	dia_gerar: {type: Number, required: true,},
	dia_notificacao: {type: Number, required: true,},
	categoria_id: {type: String, required: true},
	usuario_id: {type: String, required: true},
	empresa_id: {type: String, required: true},
	quem_inativou_id: {type: String, required: false},
})

module.exports = mongoose.model('contaFixa', schema)
