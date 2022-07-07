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

////////////////////////// entregar uma porta //////////////////////////
//${DB_USER}:${DB_PASS}
const DB_USER = process.env.DB_USER
const DB_PASS = encodeURIComponent(process.env.DB_PASS)

//app.listen(4000) // disponibiliza o express na porta 4000

const personRoutes = require('./routes/personRoutes')
app.use('/person', personRoutes)

// ENTREGAR UMA PORTA
//user_api
//cqTUtDnI6DIM1d7T
//mongodb+srv://${DB_USER}:${DB_PASS}@apicluster.0ct18pr.mongodb.net/apidb?retryWrites=true&w=majority

mongoose
  .connect(
    'mongodb+srv://user_api:cqTUtDnI6DIM1d7T@apicluster.0ct18pr.mongodb.net/apidb?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(() => {
    console.log('Conexão com o DB realizada')
    app.listen(4000) // disponibiliza o express na porta 4000
  })
  .catch(err => console.log(err))
