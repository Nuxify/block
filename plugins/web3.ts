import { Context } from '@nuxt/types'
import { ethers } from 'ethers'

export default (ctx: Context, inject: any): void => {
  let baconContract: ethers.Contract
  let greaseContract: ethers.Contract
  let theFryingPanContract: ethers.Contract
  let web3: ethers.providers.Web3Provider

  inject('web3', {
    /**
     * Get web3 provider
     *
     * @var {ethers.providers.Web3Provider}
     */
    getWeb3Provider(): ethers.providers.Web3Provider {
      return web3
    },
    /**
     * Get Bacon contract instance
     *
     * @var {ethers.Contract}
     */
    getBaconContract(): ethers.Contract {
      return baconContract
    },
    /**
     * Get Grease contract instance
     *
     * @var {ethers.Contract}
     */
    getGreaseContract(): ethers.Contract {
      return greaseContract
    },
    /**
     * Get the frying pan contract instance
     *
     * @var {ethers.Contract}
     */
    getTheFryingPanContract(): ethers.Contract {
      return theFryingPanContract
    },
    /**
     * Initialize web3 provider
     *
     * @return  {ethers.providers.Web3Provider}
     */
    initWeb3Provider(
      provider:
        | ethers.providers.ExternalProvider
        | ethers.providers.JsonRpcFetchFunc
    ): ethers.providers.Web3Provider {
      web3 = new ethers.providers.Web3Provider(provider)

      return web3
    },
    /**
     * Create new Bacon contract connection
     *
     * @return  {ethers.Contract}
     */
    initBaconContract(
      address: string,
      abi: ethers.ContractInterface,
      signer: ethers.Signer
    ): ethers.Contract {
      baconContract = new ethers.Contract(address, abi, signer)

      return baconContract
    },
    /**
     * Create new Grease contract connection
     *
     * @return  {ethers.Contract}
     */
    initGreaseContract(
      address: string,
      abi: ethers.ContractInterface,
      signer: ethers.Signer
    ): ethers.Contract {
      greaseContract = new ethers.Contract(address, abi, signer)

      return greaseContract
    },
    /**
     * Create new the frying pan contract connection
     *
     * @return  {ethers.Contract}
     */
    initTheFryingPanContract(
      address: string,
      abi: ethers.ContractInterface,
      signer: ethers.Signer
    ): ethers.Contract {
      theFryingPanContract = new ethers.Contract(address, abi, signer)

      return theFryingPanContract
    },
  })
}
