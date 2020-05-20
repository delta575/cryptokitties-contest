const Web3 = require('web3')
const KittyCoreABI = require('./KittyCoreABI')

const KITTIES_ADDRESS = '0x06012c8cf97bead5deae237070f9587f8e7a266d'

const getKittiesContract = (host) => {
  const web3Provider = new Web3(new Web3.providers.HttpProvider(host))
  const contract = new web3Provider.eth.Contract(KittyCoreABI, KITTIES_ADDRESS)
  return contract
}

module.exports = { getKittiesContract }
