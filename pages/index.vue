<template>
  <v-container fluid class="home__container mx-auto">
    <v-row no-gutters class="justify-center px-5">
      <v-col cols="12">
        <h1 class="text-center">
          {{ greetingMessage }}
        </h1>
      </v-col>
      <v-col cols="12" sm="10" md="8" lg="5" xl="5">
        <div
          class="d-flex"
          :class="$vuetify.breakpoint.xsOnly ? 'flex-column' : ''"
        >
          <v-text-field v-model="message" outlined label="Enter greeting">
          </v-text-field>
          <v-btn
            tile
            depressed
            :block="$vuetify.breakpoint.xsOnly"
            height="56"
            width="100"
            color="primary"
            class="text-none"
            :class="$vuetify.breakpoint.xsOnly ? '' : 'ml-5'"
            :loading="isLoading"
            @click="setGreeting"
          >
            Set
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, namespace, Watch } from 'nuxt-property-decorator'
import { AlertInterface } from '~/store/global/state.types'

const WEB3_STORE = namespace('web3')
const GLOBAL_STORE = namespace('global')

@Component({
  head() {
    return {
      title: 'Home',
    }
  },
})
export default class Index extends Vue {
  @GLOBAL_STORE.State('alert') global_alert!: AlertInterface
  @GLOBAL_STORE.Action('setAlert')
  global_set_alert!: (payload: AlertInterface) => void

  @WEB3_STORE.State('connectedPrimaryAddress')
  web3_connected_primary_address!: string | null

  message: string = ''
  greetingMessage: string = '<Block>'

  isLoading: boolean = false

  @Watch('web3_connected_primary_address')
  onWalletAddressChange(val: string): void {
    setTimeout(() => {
      if (val) {
        this.getGreeting()
      }
    }, 1000)
  }

  /**
   * Get greeting message
   *
   * @return  {Promise<void>}
   */
  async getGreeting(): Promise<void> {
    this.greetingMessage = await this.$web3
      .getGreeterContract()
      .connect(this.$web3.getWeb3Provider())
      .greet()
  }

  /**
   * Get greeting message
   *
   * @return  {<Promise><void>}
   */
  async setGreeting(): Promise<void> {
    if (this.message === '') {
      this.global_set_alert({
        state: true,
        message: 'Please enter a message.',
        variant: 'success',
        dismiss: true,
        timeout: 3000,
      })
      return
    }

    if (this.web3_connected_primary_address === null) {
      this.global_set_alert({
        state: true,
        message: 'Please connect your wallet.',
        variant: 'success',
        dismiss: true,
        timeout: 3000,
      })
      return
    }

    this.isLoading = true

    try {
      // always get latest connected signer
      const signer = this.$web3
        .getWeb3Provider()
        .getSigner(this.web3_connected_primary_address)

      const tx = await this.$web3
        .getGreeterContract()
        .connect(signer)
        .functions.setGreeting(this.message)

      if (tx.hash.length > 0) {
        const result = await this.$web3.utils.onTransactionWaitForReceipt(
          tx.hash
        )

        if (!result) {
          this.global_set_alert({
            state: true,
            message:
              'Kontrata Contract: Error occurred while processing request.',
            variant: 'success',
            dismiss: true,
            timeout: 3000,
          })
          return
        }
      }
      this.global_set_alert({
        state: true,
        message: 'Successfully set greeting message.',
        variant: 'success',
        dismiss: true,
        timeout: 3000,
      })
      this.message = ''
    } catch (error: any) {
      const { message } = error as Error

      if (message.includes('denied')) {
        this.global_set_alert({
          state: true,
          message: 'You cancelled the transaction.',
          variant: 'error',
          dismiss: true,
          timeout: 3000,
        })
      } else if (
        message.includes('burn amount exceeds balance') ||
        message.includes('insufficient funds')
      ) {
        this.global_set_alert({
          state: true,
          message: 'Kontrata Contract: Insufficient balance',
          variant: 'error',
          dismiss: true,
          timeout: 3000,
        })
      } else {
        const revertData = error.error.data.originalError.data
        const decodedError = this.$web3
          .getGreeterContract()
          .interface.parseError(revertData)

        this.global_set_alert({
          state: true,
          message: `Kontrata Contract: ${decodedError.name}`,
          variant: 'error',
          dismiss: true,
          timeout: 3000,
        })
      }
    }

    this.getGreeting()
    this.isLoading = false
  }
}
</script>

<style lang="scss" scoped>
.home__container {
  max-width: 1440px;
  height: 100%;
  position: relative;
  .row {
    position: absolute;
    width: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    h1 {
      font-size: 42px;
    }
  }
}
</style>
