import type { ActionTree } from 'vuex'
import { StateInterface } from './state.types'

const Actions: ActionTree<StateInterface, () => void> = {
  setConnectedPrimaryAddress(context, payload: string | null) {
    context.commit('SET_CONNECTED_PRIMARY_ADDRESS', payload)
  },
}

export default Actions
