<template>
  <v-dialog
    v-model="web3_download_metamask_dialog"
    width="450"
    @click:outside="web3_set_download_metamask_dialog(false)"
  >
    <v-card tile color="dark_gray" class="text-center pa-5">
      <div class="content--container">
        <h1>Download MetaMask and access site using Metamask Browser</h1>
        <div class="actions--container">
          <img
            src="/images/google-play-badge.png"
            alt="Google play logo"
            @click="
              redirect(
                'https://play.google.com/store/apps/details?id=io.metamask'
              )
            "
          />
          <img
            src="/images/app-store-badge.png"
            alt="Apple store logo"
            @click="
              redirect(
                'https://apps.apple.com/app/metamask-blockchain-wallet/id1438144202'
              )
            "
          />
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Vue, namespace } from 'nuxt-property-decorator'
const WEB3_STORE = namespace('web3')

@Component
export default class DownloadMetamaskDialog extends Vue {
  @WEB3_STORE.State('downloadMetamaskDialog')
  web3_download_metamask_dialog!: boolean

  @WEB3_STORE.Action('setDownloadMetamaskDialog')
  web3_set_download_metamask_dialog!: (payload: boolean) => void

  /**
   * Redirect to page
   *
   * @param   {string}  val
   *
   * @return  {void}
   */
  redirect(val: string): void {
    window.open(val, '_blank')
  }
}
</script>

<style lang="scss">
.content--container {
  h1 {
    font-size: 18px;
    font-weight: 400;
    line-height: 1.2;
  }
  .actions--container {
    display: flex;
    justify-content: center;
    margin-top: 25px;
    img {
      height: 40px;
      margin: 0 5px;
      cursor: pointer;
    }
  }
  @media (max-device-width: 320px) {
    .actions--container {
      img {
        height: 35px;
      }
    }
  }
}
</style>
