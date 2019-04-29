import express from 'express'
import controller from '../controllers/categoria.controller'

const router = express.Router()
router.get('/todos', controller.todos)
router.get('/categoriaTipo', controller.categoriaTipo)
router.post('/salvar', controller.salvar)

module.exports = router
