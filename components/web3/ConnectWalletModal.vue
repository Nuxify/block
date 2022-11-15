<template>
  <v-dialog
    v-model="web3_connect_wallet_dialog"
    width="450"
    @click:outside="web3_set_connect_wallet_dialog(false)"
  >
    <v-card tile color="dark_gray" class="text-center px-10 py-5">
      <div class="">
        <h1
          class="montserrat--font headline primary--text font-weight-bold text-center pt-5"
        >
          CONNECT YOUR WALLET.
        </h1>

        <h4
          class="body-2 width-70 mx-auto lite_gray--text mb-5 text-center pt-1 pb-5 px-2"
        >
          Connect with one of available wallet providers or create a new wallet
        </h4>
        <div v-for="(item, i) in wallets" :key="i" class="my-3 mx-3">
          <v-card
            link
            max-width="351"
            height="50"
            class="mx-auto d-flex align-center px-4 white--text"
            :class="item.css"
            @click="connectToWallet(item)"
          >
            <h4 class="body-2 font-weight-regular">{{ item.name }}</h4>
            <v-spacer />
            <v-img :src="item.logo" max-width="38px"></v-img>
          </v-card>
        </div>
        <div class="metamask__guide--link">
          <a @click="redirect('/metamask-guide')">First time using Metamask?</a>
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Vue, namespace } from 'nuxt-property-decorator'

const WEB3_STORE = namespace('web3')

interface WalletInterface {
  name?: string
  logo?: string
  provider: string
  css: string
}

@Component
export default class ConnectWalletModal extends Vue {
  @WEB3_STORE.State('connectWalletDialog')
  web3_connect_wallet_dialog!: boolean

  @WEB3_STORE.Action('setConnectWalletDialog')
  web3_set_connect_wallet_dialog!: (payload: boolean) => void

  wallets: WalletInterface[] = [
    {
      name: 'MetaMask',
      logo: '/logo/wallets/meta-mask.svg',
      provider: 'metamask',
      css: 'metamask--container',
    },
    // {
    //   name: 'WalletConnect',
    //   logo: '/logo/wallets/wallet-connect.svg',
    //   provider: 'walletconnect',
    //   css: 'connectwallet--container',
    // },
    // {
    //   name: 'Fortmatic',
    //   logo: '/logo/wallets/fortmatic.png',
    // },
    // {
    //   name: 'Coinbase Wallet',
    //   logo: '/logo/wallets/coinbase-wallet.png',
    // },
    // {
    //   name: 'MyEtherWallet',
    //   logo: '/logo/wallets/my-ether-wallet.png',
    // },
  ]

  /**
   * Emit selected wallet
   *
   * @param   {WalletInterface}  item
   *
   * @return  {void}
   */
  connectToWallet(item: WalletInterface): void {
    this.$emit('onSelectWallet', item)
  }

  /**
   * Redirect to page
   *
   * @param   {string}  val
   *
   * @return  {void}
   */
  redirect(val: string): void {
    const route = this.$router.resolve({ path: val })
    window.open(route.href, '_blank')
  }
}
</script>

<style>
.metamask--container {
  background: linear-gradient(
    90deg,
    #f5841f 0%,
    #ff5c00 0.01%,
    #ffdc24 100%
  ) !important;
}
.connectwallet--container {
  background: linear-gradient(90deg, #8d00ff 0%, #392ef7 100%) !important;
}

.metamask__guide--link {
  font-size: 14px;
  padding-top: 10px;
}
</style>
