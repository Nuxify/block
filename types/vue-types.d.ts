import { ethers } from 'ethers'
import { UserResponseInterface } from '~/api/social'

declare module 'vue/types/vue' {
  interface Vue {
    $socialRepository: {
      GetUsers: () => Promise<UserResponseInterface[]>
      GetUserByID: (id: number) => Promise<UserResponseInterface>
    }

    $web3: {
      getWeb3Provider(): ethers.providers.Web3Provider
      getGreeterContract(): ethers.Contract
      initWeb3Provider(
        provider:
          | ethers.providers.ExternalProvider
          | ethers.providers.JsonRpcFetchFunc
      ): ethers.providers.Web3Provider
      initGreeterContract(
        address: string,
        abi: ethers.ContractInterface,
        web3Signer: ethers.Signer
      ): ethers.Contract
      utils: {
        onTransactionWaitForReceipt(txHash: string): Promise<boolean>
      }
    }

    $Flip: any
    $gsap: any
    $ScrollTrigger: any
  }
}
