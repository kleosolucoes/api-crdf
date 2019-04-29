import Empresa from '../models/empresa.model'
import EmpresaTipo from '../models/empresaTipo.model'
import ContaFixa from '../models/contaFixa.model'
import Usuario from '../models/usuario.model'
import Lancamento from '../models/lancamento.model'
import LancamentoSituacao from '../models/lancamentoSituacao.model'
import { 
	objetoDeRetorno, 
	pegarDataEHoraAtual,
	SITUACAO_NAO_RECEBIDO,
	USUARIO_SISTEMA,
	EMPRESA_ADMINISTRACAO,
} from '../constantes'

exports.todos = (req, res) => {
	objetoDeRetorno.ok = false 
	objetoDeRetorno.menssagem = ''
	objetoDeRetorno.resultado = {}

	Empresa.find({}, (err, elementos) => {
		if(err){
			objetoDeRetorno.menssagem = 'Erro ao buscar empresas' 
			return res.json(objetoDeRetorno)
		}

		objetoDeRetorno.ok = true
		objetoDeRetorno.resultado = {
			elementos,
		}
		return res.json(objetoDeRetorno)
	})
}

exports.empresaTipo = (req, res) => {
	objetoDeRetorno.ok = false 
	objetoDeRetorno.menssagem = ''
	objetoDeRetorno.resultado = {}

	EmpresaTipo.find({}, (err, elementos) => {
		if(err){
			objetoDeRetorno.menssagem = 'Erro ao buscar empresa tipo' 
			return res.json(objetoDeRetorno)
		}

		objetoDeRetorno.ok = true
		objetoDeRetorno.resultado = {
			elementos,
		}
		return res.json(objetoDeRetorno)
	})
}

exports.contaFixa = (req, res) => {
	objetoDeRetorno.ok = false 
	objetoDeRetorno.menssagem = ''
	objetoDeRetorno.resultado = {}

	ContaFixa.find({}, (err, elementos) => {
		if(err){
			objetoDeRetorno.menssagem = 'Erro ao buscar conta fixa' 
			return res.json(objetoDeRetorno)
		}

		objetoDeRetorno.ok = true
		objetoDeRetorno.resultado = {
			elementos,
		}
		return res.json(objetoDeRetorno)
	})
}

exports.lancamento = (req, res) => {
	objetoDeRetorno.ok = false 
	objetoDeRetorno.menssagem = ''
	objetoDeRetorno.resultado = {}

	Lancamento.find({}, (err, elementos) => {
		if(err){
			objetoDeRetorno.menssagem = 'Erro ao buscar lançamentos' 
			return res.json(objetoDeRetorno)
		}

		objetoDeRetorno.ok = true
		objetoDeRetorno.resultado = {
			elementos,
		}
		return res.json(objetoDeRetorno)
	})
}

exports.lancamentoSituacao = (req, res) => {
	objetoDeRetorno.ok = false 
	objetoDeRetorno.menssagem = ''
	objetoDeRetorno.resultado = {}

	LancamentoSituacao.find({}, (err, elementos) => {
		if(err){
			objetoDeRetorno.menssagem = 'Erro ao buscar lançamento situacao' 
			return res.json(objetoDeRetorno)
		}

		objetoDeRetorno.ok = true
		objetoDeRetorno.resultado = {
			elementos,
		}
		return res.json(objetoDeRetorno)
	})
}

exports.lancarUm = (req, res) => {
	objetoDeRetorno.ok = false 
	objetoDeRetorno.menssagem = ''
	objetoDeRetorno.resultado = {}

	if(!req.body.dia){
		objetoDeRetorno.menssagem = 'Erro ao salvar lançamento - sem dados' 
		return res.json(objetoDeRetorno)
	}

	const diaData = req.body.dia.toString().padStart(2, '0')
	const mesData = req.body.mes.toString().padStart(2, '0')
	const data = diaData + '/' + mesData + '/' + req.body.ano
	const elemento = {
		data_criacao: pegarDataEHoraAtual()[0],
		hora_criacao: pegarDataEHoraAtual()[1],
		data_inativacao: null,
		hora_inativacao: null,
		categoria_id: req.body.categoria_id,
		valor: req.body.valor,
		taxa: req.body.taxa,
		descricao: req.body.descricao,
		usuario_id: req.body.usuario_id,
		empresa_id: req.body.empresa_id,
		data,
	}

	const novoLancamento = new Lancamento(elemento)

	novoLancamento.save((err, lancamento) => {
		if(err){
			objetoDeRetorno.menssagem = 'Erro ao salvar lançamento' 
			return res.json(objetoDeRetorno)
		}

		const elementoAssociativo = {
			data_criacao: pegarDataEHoraAtual()[0],
			hora_criacao: pegarDataEHoraAtual()[1],
			data_inativacao: null,
			hora_inativacao: null,
			situacao_id: SITUACAO_NAO_RECEBIDO,
			lancamento_id: lancamento._id,
			usuario_id: req.body.usuario_id,
		}
		const novoLancamentoSituacao = new LancamentoSituacao(elementoAssociativo)

		novoLancamentoSituacao.save((err, lancamentoSituacao) => {
			if(err){
				objetoDeRetorno.menssagem = 'Erro ao salvar lançamento situacao' 
				return res.json(objetoDeRetorno)
			}

			objetoDeRetorno.ok = true
			objetoDeRetorno.resultado = {
				lancamento,
				lancamentoSituacao
			}

			return res.json(objetoDeRetorno)
		})

	})
}

exports.lancarVarios = (req, res) => {
	objetoDeRetorno.ok = false 
	objetoDeRetorno.menssagem = ''
	objetoDeRetorno.resultado = {}

	objetoDeRetorno.resultado.elementos = []
	req.body.forEach((item, indice, array) => {
		const diaData = item.dia.toString().padStart(2, '0')
		const mesData = item.mes.toString().padStart(2, '0')
		const data = diaData + '/' + mesData + '/' + item.ano
		const elemento = {
			data_criacao: pegarDataEHoraAtual()[0],
			hora_criacao: pegarDataEHoraAtual()[1],
			data_inativacao: null,
			hora_inativacao: null,
			categoria_id: item.categoria_id,
			valor: item.valor,
			taxa: item.taxa,
			descricao: item.descricao,
			usuario_id: item.usuario_id,
			empresa_id: item.empresa_id,
			data,
		}

		const novoLancamento = new Lancamento(elemento)

		novoLancamento.save((err, lancamento) => {
			if(err){
				objetoDeRetorno.menssagem = 'Erro ao salvar lançamento' 
				return res.json(objetoDeRetorno)
			}

			const elementoAssociativo = {
				data_criacao: pegarDataEHoraAtual()[0],
				hora_criacao: pegarDataEHoraAtual()[1],
				data_inativacao: null,
				hora_inativacao: null,
				situacao_id: SITUACAO_NAO_RECEBIDO,
				lancamento_id: lancamento._id,
				usuario_id: lancamento.usuario_id,
			}
			const novoLancamentoSituacao = new LancamentoSituacao(elementoAssociativo)

			novoLancamentoSituacao.save((err, lancamentoSituacao) => {
				if(err){
					objetoDeRetorno.menssagem = 'Erro ao salvar lançamento situacao' 
					return res.json(objetoDeRetorno)
				}

				objetoDeRetorno.ok = true
				//objetoDeRetorno.resultado.elementos.push({
				//	lancamento,
				//	lancamentoSituacao
				//})

				if(indice === array.length-1){ 
					return res.json(objetoDeRetorno)
				}
			})
		})
	})
}

exports.alterarLancamento = (req, res) => {
	objetoDeRetorno.ok = false 
	objetoDeRetorno.menssagem = ''
	objetoDeRetorno.resultado = {}

	if(!req.body.lancamento_id){
		objetoDeRetorno.menssagem = 'Erro ao alterar lançamento - sem dados' 
		return res.json(objetoDeRetorno)
	}

	Lancamento.findOne({_id: req.body.lancamento_id}, (err, lancamento) => {
		const mensagemExtra = ` <p>Valor Anterior: ${lancamento.valor}, Taxa Anterior: ${lancamento.taxa}</p> <p>Valor Novo: ${req.body.valor}, Taxa Nova: ${req.body.taxa}</p> ` 
		lancamento.valor = req.body.valor
		lancamento.taxa = req.body.taxa
		lancamento.save((err, lancamento) => {
			if(err){
				objetoDeRetorno.menssagem = 'Erro ao salvar lançamento' 
				return res.json(objetoDeRetorno)
			}

			LancamentoSituacao.findOne({_id: req.body.lancamento_situacao_id}, (err, lancamentoSituacao) => {
				lancamentoSituacao.data_inativacao = pegarDataEHoraAtual()[0]		
				lancamentoSituacao.hora_inativacao = pegarDataEHoraAtual()[1]		
				lancamentoSituacao.save((err) => {
					if(err){
						objetoDeRetorno.menssagem = 'Erro ao alterar lançamento situacao' 
						return res.json(objetoDeRetorno)
					}

					const elementoAssociativo = {
						data_criacao: pegarDataEHoraAtual()[0],
						hora_criacao: pegarDataEHoraAtual()[1],
						data_inativacao: null,
						hora_inativacao: null,
						situacao_id: req.body.situacao_id,
						lancamento_id: req.body.lancamento_id,
						usuario_id: req.body.usuario_id,
						extra: mensagemExtra,
					}
					const novoLancamentoSituacao = new LancamentoSituacao(elementoAssociativo)

					novoLancamentoSituacao.save((err, lancamentoSituacaoNovo) => {
						if(err){
							objetoDeRetorno.menssagem = 'Erro ao salvar lançamento situacao' 
							return res.json(objetoDeRetorno)
						}

						objetoDeRetorno.ok = true
						objetoDeRetorno.resultado = {
							lancamento,
							lancamentoSituacao,
							lancamentoSituacaoNovo,
						}

						return res.json(objetoDeRetorno)
					})
				})
			})
		})
	})
}

exports.salvar = (req, res) => {
	objetoDeRetorno.ok = false 
	objetoDeRetorno.menssagem = ''
	objetoDeRetorno.resultado = {}

	if(!req.body.nome){
		objetoDeRetorno.menssagem = 'Erro ao salvar empresa - sem dados' 
		return res.json(objetoDeRetorno)
	}

	const elemento = {
		data_criacao: pegarDataEHoraAtual()[0],
		hora_criacao: pegarDataEHoraAtual()[1],
		data_inativacao: null,
		hora_inativacao: null,
		nome: req.body.nome,
		usuario_id: req.body.usuario_id,
		empresa_tipo_id: req.body.empresa_tipo_id,
	}

	const novaEmpresa = new Empresa(elemento)

	novaEmpresa.save((err, empresa) => {
		if(err){
			objetoDeRetorno.menssagem = 'Erro ao salvar empresa' 
			return res.json(objetoDeRetorno)
		}

		objetoDeRetorno.ok = true
		objetoDeRetorno.resultado = {
			empresa,
		}
	
		return res.json(objetoDeRetorno)
	})
}

exports.salvarContaFixa = (req, res) => {
	objetoDeRetorno.ok = false 
	objetoDeRetorno.menssagem = ''
	objetoDeRetorno.resultado = {}

	if(!req.body.categoria_id){
		objetoDeRetorno.menssagem = 'Erro ao salvar conta fixa - sem dados' 
		return res.json(objetoDeRetorno)
	}

	const elemento = {
		data_criacao: pegarDataEHoraAtual()[0],
		hora_criacao: pegarDataEHoraAtual()[1],
		data_inativacao: null,
		hora_inativacao: null,
		categoria_id: req.body.categoria_id,
		usuario_id: req.body.usuario_id,
		empresa_id: req.body.empresa_id,
		dia_gerar: parseInt(req.body.dia_gerar),
		dia_notificacao: parseInt(req.body.dia_notificacao),
	}

	const novaContaFixa = new ContaFixa(elemento)

	novaContaFixa.save((err, contaFixa) => {
		if(err){
			objetoDeRetorno.menssagem = 'Erro ao salvar conta fixa' 
			return res.json(objetoDeRetorno)
		}

		objetoDeRetorno.ok = true
		objetoDeRetorno.resultado = {
			contaFixa,
		}
	
		return res.json(objetoDeRetorno)
	})
}

exports.removerContaFixa = (req, res) => {
	objetoDeRetorno.ok = false 
	objetoDeRetorno.menssagem = ''
	objetoDeRetorno.resultado = {}

	if(!req.body.conta_fixa_id){
		objetoDeRetorno.menssagem = 'Erro ao remover conta fixa - sem dados' 
		return res.json(objetoDeRetorno)
	}

	ContaFixa.findOne({_id: req.body.conta_fixa_id}, (err, contaFixa) => {
		contaFixa.data_inativacao = pegarDataEHoraAtual()[0]		
		contaFixa.hora_inativacao = pegarDataEHoraAtual()[1]		
		contaFixa.quem_inativou_id = req.body.usuario_id
		contaFixa.save((err) => {
			if(err){
				objetoDeRetorno.menssagem = 'Erro ao remover conta fixa' 
				return res.json(objetoDeRetorno)
			}

			objetoDeRetorno.ok = true
			objetoDeRetorno.resultado = {
				contaFixa,
			}
	
			return res.json(objetoDeRetorno)
		})
	})
}

exports.removerLancamento = (req, res) => {
	objetoDeRetorno.ok = false 
	objetoDeRetorno.menssagem = ''
	objetoDeRetorno.resultado = {}

	if(!req.body.lancamento_id){
		objetoDeRetorno.menssagem = 'Erro ao remover lançamento - sem dados' 
		return res.json(objetoDeRetorno)
	}

	Lancamento.findOne({_id: req.body.lancamento_id}, (err, lancamento) => {
		lancamento.data_inativacao = pegarDataEHoraAtual()[0]		
		lancamento.hora_inativacao = pegarDataEHoraAtual()[1]		
		lancamento.save((err, lancamento) => {
			if(err){
				objetoDeRetorno.menssagem = 'Erro ao salvar lançamento' 
				return res.json(objetoDeRetorno)
			}

			LancamentoSituacao.findOne({_id: req.body.lancamento_situacao_id}, (err, lancamentoSituacao) => {
				lancamentoSituacao.data_inativacao = pegarDataEHoraAtual()[0]		
				lancamentoSituacao.hora_inativacao = pegarDataEHoraAtual()[1]		
				lancamentoSituacao.save((err) => {
					if(err){
						objetoDeRetorno.menssagem = 'Erro ao alterar lançamento situacao' 
						return res.json(objetoDeRetorno)
					}

					objetoDeRetorno.ok = true
					objetoDeRetorno.resultado = {
						lancamento,
						lancamentoSituacao,
					}

					return res.json(objetoDeRetorno)
				})
			})
		})
	})
}

exports.gerarLancamentos = (req, res) => {
	objetoDeRetorno.ok = false 
	objetoDeRetorno.menssagem = ''
	objetoDeRetorno.resultado = {}

	ContaFixa.find({data_inativacao: null}, (err, contasFixas) => {
		console.log(contasFixas)
		contasFixas.forEach(contaFixa => {
			const elemento = {
				data_criacao: pegarDataEHoraAtual()[0],
				hora_criacao: pegarDataEHoraAtual()[1],
				data_inativacao: null,
				hora_inativacao: null,
				categoria_id: contaFixa.categoria_id,
				valor: 0,
				taxa: 0,
				descricao: 'Conta Fixa',
				usuario_id: USUARIO_SISTEMA,
				empresa_id: contaFixa.empresa_id,
				data: pegarDataEHoraAtual()[0],
			}
			const novoLancamento = new Lancamento(elemento)

			novoLancamento.save((err, lancamento) => {
				if(err){
					objetoDeRetorno.menssagem = 'Erro ao salvar lançamento' 
					return res.json(objetoDeRetorno)
				}

				const elementoAssociativo = {
					data_criacao: pegarDataEHoraAtual()[0],
					hora_criacao: pegarDataEHoraAtual()[1],
					data_inativacao: null,
					hora_inativacao: null,
					situacao_id: SITUACAO_NAO_RECEBIDO,
					lancamento_id: lancamento._id,
					usuario_id: USUARIO_SISTEMA,
				}
				const novoLancamentoSituacao = new LancamentoSituacao(elementoAssociativo)

				novoLancamentoSituacao.save((err, lancamentoSituacao) => {
					if(err){
						objetoDeRetorno.menssagem = 'Erro ao salvar lançamento situacao' 
						return res.json(objetoDeRetorno)
					}
				})
			})
		})
		objetoDeRetorno.ok = true
		return res.json(objetoDeRetorno)
	})
}
