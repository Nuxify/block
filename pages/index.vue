<template>
  <v-container class="home__container mx-auto">
    <v-row justify="center" align="center">
      <v-img src="/icon.png" class="mt-10" contain height="300" width="300" />
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, namespace, Watch } from 'nuxt-property-decorator'

const WEB3_STORE = namespace('web3')

@Component({
  head() {
    return {
      title: 'Home',
    }
  },
})
export default class Index extends Vue {
  @WEB3_STORE.State('walletAddress') web3_wallet_address!: string

  @Watch('web3_wallet_address')
  onWalletAddressChange(val: string): void {
    setTimeout(() => {
      if (val.length > 0) {
        console.log('web3 wallet address:', this.web3_wallet_address)
      }
    }, 1000)
  }

  mounted(): void {
    // print values using runtime config
    console.log('APP_NAME', this.$config.appName)

    //
    // Toast notification
    // this.$toast.info('Hello')
  }
}
</script>

<style scoped>
.home__container {
  max-width: 1440px;
}
</style>
