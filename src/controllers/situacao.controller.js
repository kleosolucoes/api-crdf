import Situacao from '../models/situacao.model'
import { 
		objetoDeRetorno, 
} from '../constantes'

exports.todos = (req, res) => {
	objetoDeRetorno.ok = false 
	objetoDeRetorno.menssagem = ''
	objetoDeRetorno.resultado = {}

	Situacao.find({}, (err, elementos) => {
		if(err){
			objetoDeRetorno.menssagem = 'Erro ao buscar situações' 
			return res.json(objetoDeRetorno)
		}
		if(elementos === null){
			objetoDeRetorno.menssagem = 'Sem situações' 
			return res.json(objetoDeRetorno)
		}

		objetoDeRetorno.ok = true
		objetoDeRetorno.resultado = {
			elementos,
		}
		return res.json(objetoDeRetorno)
	})
}
