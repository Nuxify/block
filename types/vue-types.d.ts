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
      getBaconContract(): ethers.Contract
      getGreaseContract(): ethers.Contract
      getTheFryingPanContract(): ethers.Contract
      initWeb3Provider(
        provider:
          | ethers.providers.ExternalProvider
          | ethers.providers.JsonRpcFetchFunc
      ): ethers.providers.Web3Provider
      initBaconContract(
        address: string,
        abi: ethers.ContractInterface,
        signer: ethers.Signer
      ): ethers.Contract
      initGreaseContract(
        address: string,
        abi: ethers.ContractInterface,
        signer: ethers.Signer
      ): ethers.Contract
      initTheFryingPanContract(
        address: string,
        abi: ethers.ContractInterface,
        signer: ethers.Signer
      ): ethers.Contract
    }
    // nuxt runtime
    $config: any
  }
}
