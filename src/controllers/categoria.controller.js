import Categoria from '../models/categoria.model'
import CategoriaTipo from '../models/categoriaTipo.model'
import { 
	objetoDeRetorno, 
	pegarDataEHoraAtual
} from '../constantes'

exports.todos = (req, res) => {
	objetoDeRetorno.ok = false 
	objetoDeRetorno.menssagem = ''
	objetoDeRetorno.resultado = {}

	Categoria.find({}, (err, elementos) => {
		if(err){
			objetoDeRetorno.menssagem = 'Erro ao buscar categorias' 
			return res.json(objetoDeRetorno)
		}
		if(elementos === null){
			objetoDeRetorno.menssagem = 'Sem categorias' 
			return res.json(objetoDeRetorno)
		}

		objetoDeRetorno.ok = true
		objetoDeRetorno.resultado = {
			elementos,
		}
		return res.json(objetoDeRetorno)
	})
}

exports.categoriaTipo = (req, res) => {
	objetoDeRetorno.ok = false 
	objetoDeRetorno.menssagem = ''
	objetoDeRetorno.resultado = {}

	CategoriaTipo.find({}, (err, elementos) => {
		if(err){
			objetoDeRetorno.menssagem = 'Erro ao buscar categoria tipo' 
			return res.json(objetoDeRetorno)
		}
		if(elementos === null){
			objetoDeRetorno.menssagem = 'Sem categoria tipos' 
			return res.json(objetoDeRetorno)
		}

		objetoDeRetorno.ok = true
		objetoDeRetorno.resultado = {
			elementos,
		}
		return res.json(objetoDeRetorno)
	})
}

exports.salvar = (req, res) => {
	objetoDeRetorno.ok = false 
	objetoDeRetorno.menssagem = ''
	objetoDeRetorno.resultado = {}

	if(!req.body.nome){
		objetoDeRetorno.menssagem = 'Erro ao salvar categoria - sem dados' 
		return res.json(objetoDeRetorno)
	}

	const elemento = {
		data_criacao: pegarDataEHoraAtual()[0],
		hora_criacao: pegarDataEHoraAtual()[1],
		data_inativacao: null,
		hora_inativacao: null,
		nome: req.body.nome,
		credito_debito: req.body.credito_debito,
	}

	const novaCategoria = new Categoria(elemento)

	novaCategoria.save((err, categoria) => {
		if(err){
			objetoDeRetorno.menssagem = 'Erro ao salvar categoria' 
			return res.json(objetoDeRetorno)
		}
		if(categoria === null){
			objetoDeRetorno.menssagem = 'Sem categoria' 
			return res.json(objetoDeRetorno)
		}

		objetoDeRetorno.ok = true
		objetoDeRetorno.resultado = {
			categoria,
		}
	
		return res.json(objetoDeRetorno)
	})
}
