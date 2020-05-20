import { getKittiesContract } from '~/contracts/kitties'

export default ({ env }, inject) => {
  const host = env.WEB3_PROVIDER
  const contract = getKittiesContract(host)
  inject('kitties', () => contract.methods)
}
