import express from 'express'
import controller from '../controllers/empresa.controller'
import { verifyJWT } from '../constantes'

const router = express.Router()
router.get('/todos', verifyJWT, controller.todos)
router.get('/empresaTipo', verifyJWT, controller.empresaTipo)
router.get('/contaFixa', verifyJWT, controller.contaFixa)
router.get('/lancamento', verifyJWT, controller.lancamento)
router.get('/lancamentoSituacao', verifyJWT, controller.lancamentoSituacao)
router.post('/lancarUm', verifyJWT, controller.lancarUm)
router.post('/lancarVarios', verifyJWT, controller.lancarVarios)
router.post('/alterarLancamento', verifyJWT, controller.alterarLancamento)
router.post('/removerLancamento', verifyJWT, controller.removerLancamento)
router.post('/salvar', verifyJWT, controller.salvar)
router.post('/salvarContaFixa', verifyJWT, controller.salvarContaFixa)
router.post('/removerContaFixa', verifyJWT, controller.removerContaFixa)
router.get('/gerarLancamentos', controller.gerarLancamentos)

module.exports = router
