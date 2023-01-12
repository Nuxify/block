import { ethers } from 'ethers'
import { OnboardAPI } from '@web3-onboard/core'
import { UserResponseInterface } from '~/api/social'

declare module 'vue/types/vue' {
  interface Vue {
    $socialRepository: {
      GetUsers: () => Promise<UserResponseInterface[]>
      GetUserByID: (id: number) => Promise<UserResponseInterface>
    }

    $web3: {
      getWeb3Onboard(): OnboardAPI
      getWeb3Provider(): ethers.providers.Web3Provider
      getGreeterContract(): ethers.Contract
      initWeb3Onboard(onboard: OnboardAPI): OnboardAPI
      initWeb3Provider(
        provider:
          | ethers.providers.ExternalProvider
          | ethers.providers.JsonRpcFetchFunc
      ): ethers.providers.Web3Provider
      initGreeterContract(
        address: string,
        abi: ethers.ContractInterface
      ): ethers.Contract
      utils: {
        onTransactionWaitForReceipt(txHash: string): Promise<boolean>
      }
    }
    $theme: {
      variables: object
    }

    $Flip: any
    $gsap: any
    $ScrollTrigger: any
  }
}
