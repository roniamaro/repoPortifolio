const router = require('express').Router()

const Person = require('../models/Person')

// POST - Creat Person
router.post('/', async (req, res) => {
  // req.body
  // {name: "Roni", salary: 100, approved: false}
  const { name, salary, approved } = req.body

  if (!name) {
    res.status(422).json({ error: 'O Nome é obrigatório' })
    return
  }

  const person = {
    name,
    salary,
    approved
  }

  // create
  try {
    // criando dados
    await Person.create(person)

    res.status(201).json({ message: 'Pessoa inserida no sistema...' })
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

//GET - Consult Persons
router.get('/', async (req, res) => {
  // read
  try {
    // lendo dados
    const people = await Person.find()

    res.status(201).json(people)
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

//GET - Consult Person by _id
router.get('/:id', async (req, res) => {
  // extrair o dado da requisão, pela url = req.params
  const id = req.params.id

  try {
    const person = await Person.findOne({ _id: id })

    if (!person) {
      res.status(422).json({ error: 'O Usuário não foi encontrado' })
      return
    }

    res.status(200).json(person)
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

//PATCH - Atualization Person by _id (PUT, PATCH)
//PATCH para atualização parcial;
//PUT para atualização geral;
router.patch('/:id', async (req, res) => {
  const id = req.params.id
  const { name, salary, approved } = req.body
  const person = {
    name,
    salary,
    approved
  }

  try {
    const updatedPerson = await Person.updateOne({ _id: id }, person)

    if (updatedPerson.matchedCount === 0) {
      res.status(422).json({ error: 'Pessoa não foi encontrada...' })
      return
    } else {
      res.status(200).json({ message: 'Pessoa atualizada...' })
    }

    res.status(200).json(person)
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

//DELETE - Delete Person by _id
router.delete('/:id', async (req, res) => {
  const id = req.params.id
  
  const person = await Person.findOne({ _id: id })
  
  if (!person) {
    res.status(422).json({ error: 'O Usuário não foi encontrado' })
    return
  }

  try {
    await Person.deleteOne({ _id: id })
    res.status(200).json({ message: 'Pessoa deletada...' })
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

module.exports = router
