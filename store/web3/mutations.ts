import { MutationTree } from 'vuex'
import { StateInterface } from './state.types'

const Mutations: MutationTree<StateInterface> = {
  SET_CONNECT_WALLET_DIALOG(state, data: boolean) {
    state.connectWalletDialog = data
  },
  SET_DOWNLOAD_METAMASK_DIALOG(state, data: boolean) {
    state.downloadMetamaskDialog = data
  },
  SET_WALLET_ADDRESS(state, data: string) {
    state.walletAddress = data
  },
}

export default Mutations
