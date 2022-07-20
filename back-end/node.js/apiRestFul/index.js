////////////////////////// config inicial //////////////////////////
require('dotenv').config()
const express = require('express') // import do express
const app = express() // inicialização do express (indicar que estamos usando/rodando)
const mongoose = require('mongoose')

////////////////////////// forma de ler JSON -> middlewares //////////////////////////
app.use(
  // app.use -> criação do middleware
  express.urlencoded({
    // urlencoded -> middleware próprio do express que nos permite ler JSON
    extended: true
  })
)

app.use(express.json()) // o middleware le JSON e o express.json envia JSON de volta ao usuário

////////////////////////// rota inicial / endpoint //////////////////////////
app.get('/', (req, res) => {
  // mostrar req
  res.json({ message: 'Express rodando...' })
})

////////////////////////// rotas da API
const personRoutes = require('./routes/personRoutes')
app.use('/person', personRoutes)

////////////////////////// entregar uma porta //////////////////////////
const DB_USER = process.env.DB_USER
const DB_PASS = encodeURIComponent(process.env.DB_PASS)

mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASS}@apicluster.0ct18pr.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log('Conexão com o DB realizada')
    app.listen(4000) // disponibiliza o express na porta 4000
  })
  .catch(err => console.log(err))
