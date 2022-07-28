import { Context } from '@nuxt/types'
import { ethers } from 'ethers'

export default (ctx: Context, inject: any): void => {
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
  })
}
