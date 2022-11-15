import { ActionTree } from 'vuex'
import { StateInterface } from './state.types'

const Actions: ActionTree<StateInterface, () => void> = {
  setConnectWalletDialog(context, payload: boolean) {
    context.commit('SET_CONNECT_WALLET_DIALOG', payload)
  },
  setDownloadMetamaskDialog(context, payload: boolean) {
    context.commit('SET_DOWNLOAD_METAMASK_DIALOG', payload)
  },
  setWalletAddress(context, payload: string) {
    context.commit('SET_WALLET_ADDRESS', payload)
  },
}

export default Actions
