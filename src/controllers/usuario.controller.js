import Usuario from '../models/usuario.model'
import UsuarioTipo from '../models/usuarioTipo.model'
import bcrypt from 'bcrypt-nodejs'
import fetch from 'node-fetch'
import { 
	verifyJWT, 
	objetoDeRetorno, 
	gerarToken, 
	pegarDataEHoraAtual,
	SITUACAO_ATIVO,
	SITUACAO_INATIVO,
	FIRE_BASE,
} from '../constantes'

exports.teste = (req, res) => {
	objetoDeRetorno.ok = false 
	objetoDeRetorno.menssagem = ''
	objetoDeRetorno.resultado = {}

	const passwordString = 123
	bcrypt.hash(passwordString, null, null, (err, hashPassword) => {
		objetoDeRetorno.ok = true
		objetoDeRetorno.resultado = {
			hash: hashPassword,
			foo: 'bar',
		}
		res.json(objetoDeRetorno)
	})
}

exports.login = (req, res) => {
	objetoDeRetorno.ok = false 
	objetoDeRetorno.menssagem = ''
	objetoDeRetorno.resultado = {}

	const senha = req.body.senha + ''
	Usuario.findOne({
		email: req.body.email, 
		data_inativacao: null
	}, (err, elemento) => {
		if(err){
			objetoDeRetorno.menssagem = 'Erro ao buscar usuario' 
			return res.json(objetoDeRetorno)
		}
		if(elemento === null){
			objetoDeRetorno.menssagem = 'Usuario nao encontrado' 
			return res.json(objetoDeRetorno)
		}

		bcrypt.compare(senha, elemento.senha, (err, result) => {
			if(err){
				objetoDeRetorno.menssagem = 'Erro ao comparar senha'
				return res.json(objetoDeRetorno)
			}
			if(!result){
				objetoDeRetorno.menssagem = 'Senha não confere'
				return res.json(objetoDeRetorno)
			}
			/* senha correta */
			const token = gerarToken(elemento.id)
			objetoDeRetorno.ok = true
			objetoDeRetorno.resultado = {
				token,
				usuario_id: elemento.id,
				empresa_id: elemento.empresa_id,
			}
			res.json(objetoDeRetorno)
		})
	})
}

exports.todos = (req, res) => {
	objetoDeRetorno.ok = false 
	objetoDeRetorno.menssagem = ''
	objetoDeRetorno.resultado = {}

	Usuario.find({}, (err, elementos) => {
		if(err){
			objetoDeRetorno.menssagem = 'Erro ao buscar usuarios' 
			return res.json(objetoDeRetorno)
		}

		objetoDeRetorno.ok = true
		objetoDeRetorno.resultado = {
			elementos,
		}
		return res.json(objetoDeRetorno)
	})
}

exports.usuarioTipo = (req, res) => {
	objetoDeRetorno.ok = false 
	objetoDeRetorno.menssagem = ''
	objetoDeRetorno.resultado = {}

	UsuarioTipo.find({}, (err, elementos) => {
		if(err){
			objetoDeRetorno.menssagem = 'Erro ao buscar usuario tipo' 
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
		objetoDeRetorno.menssagem = 'Erro ao salvar usuario - sem dados' 
		return res.json(objetoDeRetorno)
	}

	const passwordString = req.body.senha
	bcrypt.hash(passwordString, null, null, (err, hashPassword) => {
		if(err){
			objetoDeRetorno.menssagem = 'Erro ao transformar senha' 
			return res.json(objetoDeRetorno)
		}

		const elemento = {
			data_criacao: pegarDataEHoraAtual()[0],
			hora_criacao: pegarDataEHoraAtual()[1],
			data_inativacao: null,
			hora_inativacao: null,
			nome: req.body.nome,
			email: req.body.email,
			senha: hashPassword,
			usuario_tipo_id: req.body.usuario_tipo_id,
			empresa_id: req.body.empresa_id,
		}

		const novoUsuario = new Usuario(elemento)

		novoUsuario.save((err, usuario) => {
			if(err){
				objetoDeRetorno.menssagem = 'Erro ao salvar usuario' 
				return res.json(objetoDeRetorno)
			}

			objetoDeRetorno.ok = true
			objetoDeRetorno.resultado = {
				usuario,
			}

			return res.json(objetoDeRetorno)
		})
	})
}

exports.remover = (req, res) => {
	objetoDeRetorno.ok = false 
	objetoDeRetorno.menssagem = ''
	objetoDeRetorno.resultado = {}

	if(!req.body.usuario_id){
		objetoDeRetorno.menssagem = 'Erro ao remover usuario - sem dados' 
		return res.json(objetoDeRetorno)
	}

	Usuario.findOne({_id: req.body.usuario_id}, (err, usuario) => {
		usuario.data_inativacao = pegarDataEHoraAtual()[0]		
		usuario.hora_inativacao = pegarDataEHoraAtual()[1]		
		usuario.quem_inativou_id = req.body.quem_id
		usuario.save((err) => {
			if(err){
				objetoDeRetorno.menssagem = 'Erro ao remover usuario' 
				return res.json(objetoDeRetorno)
			}

			objetoDeRetorno.ok = true
			objetoDeRetorno.resultado = {
				usuario
			}

			return res.json(objetoDeRetorno)
		})
	})
}

exports.salvarToken = (req, res) => {
	objetoDeRetorno.ok = false 
	objetoDeRetorno.menssagem = ''
	objetoDeRetorno.resultado = {}

	if(!req.body.token){
		objetoDeRetorno.menssagem = 'Erro ao salvar usuario token - sem dados' 
		return res.json(objetoDeRetorno)
	}

	Usuario.findOne({_id: req.body.usuario_id}, (err, usuario) => {
		usuario.token = req.body.token 
		usuario.save((err) => {
			if(err){
				objetoDeRetorno.menssagem = 'Erro ao salvar token usuario' 
				return res.json(objetoDeRetorno)
			}

			objetoDeRetorno.ok = true
			objetoDeRetorno.resultado = {
				usuario
			}

			return res.json(objetoDeRetorno)
		})
	})
}

exports.notificar = (req, res) => {
	objetoDeRetorno.ok = false 
	objetoDeRetorno.menssagem = ''
	objetoDeRetorno.resultado = {}

	Usuario.find({}, (err, usuario) => {
		const url = 'https://fcm.googleapis.com/fcm/send'
		const headers = {
			'Content-Type': 'application/json',
			'Authorization': FIRE_BASE,
		}
		const dados = 
			{
				"notification": {
					"title": "Firebase",
					"body": "Firebase is awesome",
					"click_action": "http://localhost:3000/",
					"icon": "http://url-to-an-icon/icon.png"
				},
				"to": usuario.token
			}
		fetch(url,
			{
				headers,
				method: 'POST',
				body: JSON.stringify(dados),
			})
			.then(resultado => resultado.json())
			.then(json => json)
	})
}
