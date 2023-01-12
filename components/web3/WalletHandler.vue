<template>
  <div></div>
</template>

<script lang="ts">
import { Component, Vue, namespace } from 'nuxt-property-decorator'
import Onboard from '@web3-onboard/core'
import injectedModule from '@web3-onboard/injected-wallets'

const WEB3_STORE = namespace('web3')

@Component
export default class WalletHandler extends Vue {
  @WEB3_STORE.Action('setConnectedPrimaryAddress')
  web3_set_connected_primary_address!: (payload: string | null) => void

  @WEB3_STORE.State('connectedPrimaryAddress')
  web3_connected_primary_address!: string | null

  /**
   * Auto reconnect last connected wallet
   *
   * @return  {Promise<void>}
   */
  async autoConnectWallet(): Promise<void> {
    try {
      const previouslyConnectedWallets = JSON.parse(
        `${localStorage.getItem('connectedWallets')}`
      )

      if (previouslyConnectedWallets) {
        // Connect the most recently connected wallet (first in the array)
        // await this.$web3.getWeb3Onboard().connectWallet({
        //   autoSelect: previouslyConnectedWallets[0],
        // })

        // You can also auto connect "silently" and disable all onboard modals to avoid them flashing on page load
        await this.$web3.getWeb3Onboard().connectWallet({
          autoSelect: {
            disableModals: true,
            label: previouslyConnectedWallets[0],
          },
        })

        // OR - loop through and initiate connection for all previously connected wallets
        // note: This UX might not be great as the user may need to login to each wallet one after the other
        // for (walletLabel in previouslyConnectedWallets) {
        //   await onboard.connectWallet({ autoSelect: walletLabel })
        // }
      }
    } catch (error) {
      console.error(error)
    }
  }

  /**
   * Initialize smart contracts
   *
   * @return  {<Promise><void>}
   */
  initializeContracts(): void {
    this.$web3.initGreeterContract(
      this.$config.greeterContractAddress,
      this.$config.greeterContractABI
    )
  }

  created(): void {
    const injected = injectedModule()

    // initialize web3Onboard
    const web3Onboard = Onboard({
      wallets: [injected],
      chains: [
        {
          id: this.$config.ethChainId,
          token: this.$config.ethToken,
          label: this.$config.ethLabel,
          rpcUrl: this.$config.ethRPC,
        },
      ],
      appMetadata: {
        name: this.$config.appName,
        icon: '/icon.png',
        logo: '/icon.png',
        description: this.$config.appDescription,
        recommendedInjectedWallets: [
          { name: 'MetaMask', url: 'https://metamask.io' },
        ],
      },
    })

    this.$web3.initWeb3Onboard(web3Onboard)

    // auto-reconnect on reload
    this.autoConnectWallet()

    // wallet state listener
    const wallets = this.$web3.getWeb3Onboard().state.select('wallets')
    wallets.subscribe((newWalletState) => {
      if (newWalletState[0]) {
        // initialize contracts once (without signer as it can be changing)
        if (this.web3_connected_primary_address === null) {
          this.web3_set_connected_primary_address(
            newWalletState[0].accounts[0].address
          )

          this.initializeContracts()
          console.log('initialized contracts')
        }

        // update to latest selected provider
        this.$web3.initWeb3Provider(newWalletState[0].provider)

        // get primary wallet and provider
        const [primaryWallet] = this.$web3.getWeb3Onboard().state.get().wallets
        this.web3_set_connected_primary_address(
          primaryWallet.accounts[0].address
        )
        console.log(
          'primary wallet address: ',
          primaryWallet.accounts[0].address,
          this.$web3.getWeb3Provider()
        )
      } else if (this.web3_connected_primary_address) {
        // if newWalletState is empty and connectedPrimaryAddress is not null, meaning disconnected
        localStorage.removeItem('connectedWallets')
        this.web3_set_connected_primary_address(null)
      }
    })
  }
}
</script>
