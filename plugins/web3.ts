import { Context } from '@nuxt/types'
import { ethers } from 'ethers'

export default (ctx: Context, inject: any): void => {
  let web3: ethers.providers.Web3Provider // web3 provider
  let greeterContract: ethers.Contract

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
     * Get greeter contract instance
     *
     * @var {ethers.Contract}
     */
    getGreeterContract(): ethers.Contract {
      return greeterContract
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
     * Create new Greeter contract connection
     *
     * @return  {ethers.Contract}
     */
    initGreeterContract(
      address: string,
      abi: ethers.ContractInterface,
      web3Signer: ethers.Signer
    ): void {
      greeterContract = new ethers.Contract(address, abi, web3Signer)
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
          await web3.waitForTransaction(txHash)
          const receipt = await web3.getTransactionReceipt(txHash)

          return receipt !== null
        } catch (err) {
          return false
        }
      },
    },
  })
}
