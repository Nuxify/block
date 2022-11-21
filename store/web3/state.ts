import { StateInterface } from './state.types'

const State: StateInterface = {
  connectWalletDialog: false,
  downloadMetamaskDialog: false,
  walletAddress: '',
}

export default () => State
