import { Context } from '@nuxt/types'
import { ethers } from 'ethers'
import { OnboardAPI } from '@web3-onboard/core'

export default (ctx: Context, inject: any): void => {
  let web3Onboard: OnboardAPI
  let web3Provider: ethers.providers.Web3Provider // web3 provider
  let web3JsonRPC: ethers.providers.JsonRpcProvider
  let greeterContract: ethers.Contract

  inject('web3', {
    /**
     * Get web3Onboard instance
     *
     * @return  {OnboardAPI}
     */
    getWeb3Onboard(): OnboardAPI {
      return web3Onboard
    },
    /**
     * Get web3 provider
     *
     * @var {ethers.providers.Web3Provider}
     */
    getWeb3Provider(): ethers.providers.Web3Provider {
      return web3Provider
    },
    /**
     * Get web3 json rpc provider
     *
     * @var {ethers.providers.JsonRpcProvider}
     */
    getWeb3JsonRPCProvider(): ethers.providers.JsonRpcProvider {
      return web3JsonRPC
    },
    /**
     * Get greeter contract instance
     *
     * @var {ethers.Contract}
     */
    getGreeterContract(): ethers.Contract {
      return greeterContract
    },
    /**
     * Init web3Onboard
     *
     * @param   {OnboardAPI}  onboard
     *
     * @return  {OnboardAPI}
     */
    initWeb3Onboard(onboard: OnboardAPI): OnboardAPI {
      web3Onboard = onboard

      return web3Onboard
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
      web3Provider = new ethers.providers.Web3Provider(provider)

      return web3Provider
    },
    /**
     * Initialize web3 json rpc
     *
     * @return  {ethers.providers.Web3Provider}
     */
    initWeb3JsonRPCProvider(provider: string): void {
      web3JsonRPC = new ethers.providers.JsonRpcProvider(provider, 'any')
    },
    /**
     * Create new Greeter contract connection
     *
     * @return  {ethers.Contract}
     */
    initGreeterContract(address: string, abi: ethers.ContractInterface): void {
      greeterContract = new ethers.Contract(address, abi)
    },

    /// Utility functions
    utils: {
      /**
       * On transaction wait for receipt
       *
       * @param	 {string<boolean>}	 txHash
       *
       * @return	{Promise<boolean>}
       */
      async onTransactionWaitForReceipt(txHash: string): Promise<boolean> {
        console.log('waiting for transaction receipt:', txHash)

        try {
          await web3Provider.waitForTransaction(txHash)
          const receipt = await web3Provider.getTransactionReceipt(txHash)

          return receipt !== null
        } catch (err) {
          return false
        }
      },
    },
  })
}
