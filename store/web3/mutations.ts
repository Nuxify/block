import type { MutationTree } from 'vuex'
import { StateInterface } from './state.types'

const Mutations: MutationTree<StateInterface> = {
  SET_CONNECTED_PRIMARY_ADDRESS(state, data: string | null) {
    state.connectedPrimaryAddress = data
  },
}

export default Mutations
