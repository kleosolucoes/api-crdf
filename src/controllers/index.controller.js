import { 
	objetoDeRetorno,
} from  '../constantes'

exports.index = (req, res, next) => {
	objetoDeRetorno.ok = true 
	objetoDeRetorno.menssagem = ''
	objetoDeRetorno.resultado = {
		dados: 'saitama',
	}
	res.json(objetoDeRetorno)
}
