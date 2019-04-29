import express from 'express'
import controller from '../controllers/situacao.controller'

const router = express.Router()
router.get('/todos', controller.todos)

module.exports = router
