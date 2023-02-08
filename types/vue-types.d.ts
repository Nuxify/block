import { ethers } from 'ethers'
import { OnboardAPI } from '@web3-onboard/core'
import { LsKeys } from '~/api/localstorage'
import { UserResponseInterface } from '~/api/social'

declare module 'vue/types/vue' {
  interface Vue {
    $localStorageRepository: {
      Clear(): void
      GetItem(key: LsKeys): string | null
      RemoveItem(key: LsKeys): void
      SetItem(key: LsKeys, value: string): void
    }
    $socialRepository: {
      GetUsers: () => Promise<UserResponseInterface[]>
      GetUserByID: (id: number) => Promise<UserResponseInterface>
    }

    $web3: {
      getWeb3Onboard(): OnboardAPI
      getWeb3Provider(): ethers.providers.Web3Provider
      getWeb3JsonRPCProvider(): ethers.providers.JsonRpcProvider
      getGreeterContract(): ethers.Contract
      initWeb3Onboard(onboard: OnboardAPI): OnboardAPI
      initWeb3Provider(
        provider:
          | ethers.providers.ExternalProvider
          | ethers.providers.JsonRpcFetchFunc
      ): ethers.providers.Web3Provider
      initWeb3JsonRPCProvider(provider: string): void
      initGreeterContract(
        address: string,
        abi: ethers.ContractInterface
      ): ethers.Contract
      utils: {
        onTransactionWaitForReceipt(txHash: string): Promise<boolean>
      }
    }
  }
}
