<template>
  <v-app id="app" :style="$theme.variables">
    <Header @disconnectWallet="disconnectWallet" />
    <nuxt />
    <Footer />

    <!-- handle wallet logic -->
    <WalletHandler :disconnect-wallet-timestamp="disconnectWalletTimestamp" />

    <DownloadMetamaskDialog />

    <!-- Alert pop-up -->
    <div class="alert--container">
      <v-alert
        v-if="global_alert.state"
        tile
        :color="global_alert.variant"
        class="alert-message white--text"
      >
        <h1>{{ global_alert.message }}</h1>
        <v-btn fab x-small depressed text @click="global_set_alert(false)">
          <v-icon color="white"> mdi-close </v-icon>
        </v-btn>
      </v-alert>
    </div>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue, namespace, Watch } from 'nuxt-property-decorator'
import { Footer } from '~/components/footer'
import { Header } from '~/components/header'
import { DownloadMetamaskDialog, WalletHandler } from '~/components/web3'
import { AlertInterface } from '~/store/global/state.types'

const GLOBAL_STORE = namespace('global')

@Component({
  components: {
    DownloadMetamaskDialog,
    Header,
    Footer,
    WalletHandler,
  },
})
export default class Default extends Vue {
  @GLOBAL_STORE.State('alert') global_alert!: AlertInterface
  @GLOBAL_STORE.Action('setAlert')
  global_set_alert!: (payload: AlertInterface) => void

  connect: boolean = false
  disconnectWalletTimestamp: number = 0

  @Watch('global_alert')
  onAlertChange(): void {
    if (this.global_alert.state) {
      if (!this.global_alert.dismiss) {
        return
      }

      setTimeout(() => {
        this.global_set_alert({ state: false })
      }, this.global_alert.timeout)
    }
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
<style lang="scss" scoped>
.alert--container {
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
  z-index: 9999;
  .alert-message {
    margin-bottom: 0;
    padding: 10px 20px !important;
    h1 {
      font-size: 18px;
      text-align: center;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: normal;
      padding: 0 40px !important;
    }
    .v-btn {
      position: absolute;
      right: 1%;
      top: 50%;
      -ms-transform: translateY(-50%);
      transform: translateY(-50%);
    }
  }
}

@media (max-device-width: 599px) {
  .alert--container {
    .alert-message {
      h1 {
        padding: 5px 20px !important;
      }
    }
  }
}
</style>
