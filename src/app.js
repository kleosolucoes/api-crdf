// app.js

import express from 'express'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import morgan from 'morgan'
import cors from 'cors'
import indexRoute from './routes/index.route'
import usuarioRoute from './routes/usuario.route'
import situacaoRoute from './routes/situacao.route'
import categoriaRoute from './routes/categoria.route'
import empresaRoute from './routes/empresa.route'
import mongoose from 'mongoose'
import { verifyJWT } from './constantes'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
let mongoDB = process.env.MONGODB_URI
mongoose.connect(mongoDB, { useNewUrlParser: true})
mongoose.Promise = global.Promise
let db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.use(cors())
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(morgan('dev'))
app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.options('*', cors())
app.use('/', indexRoute)
app.use('/usuario', usuarioRoute)
app.use('/situacao', verifyJWT, situacaoRoute)
app.use('/categoria', verifyJWT, categoriaRoute)
app.use('/empresa', empresaRoute)
const port = process.env.PORT || 8080
app.listen(port, () => {
	console.log('Server: ' + port);
})
