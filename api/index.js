require('dotenv').config()

const { Router } = require('express')
const { Kitty } = require('../db/models')
const { getKittiesContract } = require('../contracts/kitties')

const router = Router()

const provider = process.env.WEB3_PROVIDER
const contract = getKittiesContract(provider)

const validateKitty = async (id) => {
  const kitty = await contract.methods.getKitty(id).call()
  if (!kitty) throw new Error("This kitty hasn't been born yet!")
}

router.get('/kitties', async (req, res) => {
  const kitties = await Kitty.find()
  const parsedKitties = kitties.map(({ _id, votes }) => ({ id: _id, votes }))
  res.send(parsedKitties)
})

router.post('/kitties', async (req, res, next) => {
  const { id } = req.body
  const votes = 0
  try {
    await validateKitty(id)
    await Kitty.create({ _id: id, votes })
    res.status(201).send({ id, votes })
  } catch (error) {
    if (error.code === 11000) {
      const { votes } = await Kitty.findById(id)
      res.status(200).send({ id, votes })
    } else next(error)
  }
})

router.get('/kitties/:id', async (req, res) => {
  const { id } = req.params
  const { votes } = await Kitty.findById(id)
  res.send({ id, votes })
})

router.post('/kitties/:id/vote', async (req, res) => {
  const { id } = req.params
  await validateKitty(id)
  const kitty = await Kitty.findById(id)
  const votes = kitty.votes + 1
  await Kitty.findByIdAndUpdate(id, { votes })
  res.send({ id, votes })
})

router.delete('/kitties/:id', async (req, res, next) => {
  const { id } = req.params
  await Kitty.findByIdAndDelete(id)
  res.sendStatus(200)
})

module.exports = router
