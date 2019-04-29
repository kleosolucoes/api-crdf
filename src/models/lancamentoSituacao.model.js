import mongoose from 'mongoose'
const Schema = mongoose.Schema

let schema = new Schema({
	data_criacao: {type: String, required: true},
	hora_criacao: {type: String, required: true},
	data_inativacao: {type: String, required: false},
	hora_inativacao: {type: String, required: false},
	lancamento_id: {type: String, required: true},
	situacao_id: {type: String, required: true},
	usuario_id: {type: String, required: true},
	extra: {type: String, required: false},
})

module.exports = mongoose.model('lancamentoSituacao', schema)
