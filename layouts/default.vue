<template>
  <v-app id="app">
    <Header @disconnectWallet="disconnectWallet" />
    <nuxt />
    <Footer />

    <!-- Connect wallet modal -->
    <ConnectWalletModal @onSelectWallet="onSelectWallet" />

    <!-- handle wallet logic -->
    <WalletHandler
      :wallet="selectedWallet"
      :disconnectWalletTimestamp="disconnectWalletTimestamp"
      @onClearWallet="onClearWallet"
    />
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Footer } from '~/components/footer'
import { Header } from '~/components/header'
import { ConnectWalletModal, WalletHandler } from '~/components/web3'

interface WalletInterface {
  name?: string
  logo?: string
  provider: string
  css: string
}

@Component({
  components: {
    ConnectWalletModal,
    Header,
    Footer,
    WalletHandler,
  },
})
export default class Default extends Vue {
  connect: boolean = false
  disconnectWalletTimestamp: number = 0

  selectedWallet: WalletInterface = {
    name: '',
    logo: '',
    provider: '',
    css: '',
  }

  /**
   * Clear wallet event
   *
   * @return  {void}
   */
  onClearWallet(): void {
    this.selectedWallet = {
      name: '',
      logo: '',
      provider: '',
      css: '',
    }
  }

  /**
   * Select wallet connection
   *
   * @param   {WalletInterface}  wallet
   * @param   {boolean}          connection
   *
   * @return  {void}
   */
  onSelectWallet(wallet: WalletInterface): void {
    this.selectedWallet = wallet
  }

  /**
   * Disconnect wallet event
   *
   * @return  {<void>}
   */
  disconnectWallet(): void {
    this.disconnectWalletTimestamp = Math.floor(Date.now() / 1000)
  }
}
</script>
