<template>
  <div></div>
</template>

<script lang="ts">
import { Component, Vue, namespace, Prop, Watch } from 'nuxt-property-decorator'
import Onboard from '@web3-onboard/core'
import injectedModule from '@web3-onboard/injected-wallets'
import walletConnectModule from '@web3-onboard/walletconnect'

const WEB3_STORE = namespace('web3')

@Component
export default class WalletHandler extends Vue {
  @WEB3_STORE.State('connectWalletDialog')
  web3_connect_wallet_dialog!: boolean

  @WEB3_STORE.Action('setWalletAddress') web3_set_wallet_address!: (
    payload: string
  ) => void

  @WEB3_STORE.Action('setConnectWalletDialog')
  global_set_connect_wallet_dialog!: (payload: boolean) => void

  @WEB3_STORE.Action('setDownloadMetamaskDialog')
  web3_set_download_metamask_dialog!: (payload: boolean) => void

  @WEB3_STORE.Action('setConnectWalletDialog')
  web3_set_connect_wallet_dialog!: (payload: boolean) => void

  @Prop({ default: 0 }) disconnectWalletTimestamp!: number

  @Watch('disconnectWalletTimestamp')
  onDisconnectWalletWalletTimestamp(val: number): void {
    if (val > 0) {
      this.disconnectWallet()
    }
  }

  @Watch('web3_connect_wallet_dialog', { immediate: true, deep: true })
  onConnectWallet(val: boolean): void {
    if (val) {
      this.connectToWallet()
    }

    // To open the connect wallet dialog again after closing it
    this.web3_set_connect_wallet_dialog(false)
  }

  wallets: any

  /**
   * Connect wallet
   *
   * @return  {Promise<void>}
   */
  async connectToWallet(): Promise<void> {
    try {
      const injected = injectedModule()
      const walletConnect = walletConnectModule()

      const onboard = Onboard({
        wallets: [injected, walletConnect],
        chains: [
          {
            id: '0x1',
            token: 'ETH',
            label: 'Ethereum Mainnet',
            rpcUrl: 'https://mainnet.infura.io/v3',
          },
          {
            id: '0x5',
            token: 'GoerliETH',
            label: 'Goerli',
            rpcUrl: `https://goerli.infura.io/v3`,
          },
        ],
        appMetadata: {
          // Change base on the project content
          name: 'Block Template App',
          icon: '/favicon.ico',
          description: 'An Block template app',
        },
      })

      this.wallets = await onboard.connectWallet()

      if (!this.wallets[0]) {
        return
      }
      // set wallet address
      this.web3_set_wallet_address(this.wallets[0].accounts[0].address)

      this.$web3.initWeb3Provider((window as any).ethereum)

      this.switchMetamaskNetwork()

      // save web3 flags
      this.saveWeb3TrackingFlags(this.wallets[0].label)

      console.log('wallets: ', this.wallets)
    } catch (error) {
      const { message } = error as Error

      if (
        message.includes('denied') ||
        message.includes('User rejected the request')
      ) {
        this.$toast.error('You cancelled the transaction')
      }
      // for metamask
      else if (this.wallets[0].label === 'metamask') {
        // for mobile
        if (this.$vuetify.breakpoint.smAndDown) {
          this.global_set_connect_wallet_dialog(false)
          this.web3_set_download_metamask_dialog(true)
        }
        // for web
        else {
          this.clearWeb3TrackingFlags()
          this.$router.push('/metamask-guide')
        }
      }

      this.clearWeb3TrackingFlags()
      return
    }

    // subscribe to accounts change
    ;(window as any).ethereum.on('accountsChanged', (accounts: string[]) => {
      if (accounts.length === 0) {
        this.clearWeb3TrackingFlags()

        alert('Wallet successfully disconnected')
        return
      }

      this.clearWeb3TrackingFlags()
      alert('Please connect your wallet again.')
      location.reload()
    })

    // subscribe to chainId change
    ;(window as any).ethereum.on('chainChanged', (chainId: number) => {
      console.log('chainId', chainId)
      location.reload()
    })

    // subscribe to session disconnection
    ;(window as any).ethereum.on(
      'disconnect',
      (code: number, reason: string) => {
        console.log('disconnect', code, reason)
      }
    )

    // get signer
    const signer = this.$web3.getWeb3Provider().getSigner()

    // initialize contract
    this.$web3.initGreeterContract(
      this.$config.greeterContractAddress,
      this.$config.greeterContractABI,
      signer
    )
  }

  /**
   * Switch metamask network
   *
   * @return  {Promise<void>}
   */
  async switchMetamaskNetwork(): Promise<void> {
    if (this.$config.debug) {
      try {
        // switch to testnet bsc
        await (window as any).ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x5' }], // write the chainId here
        })
      } catch (error) {
        // add network to metamask (remove if metamask default networks)
        await (window as any).ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: '0x61',
              chainName: 'BSC Testnet',
              nativeCurrency: {
                symbol: 'BNB',
                decimals: 18,
              },
              rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/'],
              blockExplorerUrls: ['https://testnet.bscscan.com'],
            },
          ],
        })
      }
    } else {
      try {
        // switch to mainnet ethereum
        await (window as any).ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x1' }], // write the chainId here
        })
      } catch (error) {
        const { message } = error as Error

        if (
          message.includes('denied') ||
          message.includes('User rejected the request')
        ) {
          this.$toast.error('You cancelled the transaction')
        } else {
          this.$toast.error(message)
        }

        this.clearWeb3TrackingFlags()
      }
    }
  }

  /**
   * Clear web3 tracking flags when locked
   *
   * @return  {void}
   */
  clearWeb3TrackingFlags(): void {
    // clear tracking flags
    localStorage.removeItem('web3_connect_cached_provider')
    localStorage.removeItem('wallet_provider')

    // clear state
    this.web3_set_wallet_address('')

    // emit clear state
    this.$emit('onClearWallet')
  }

  /**
   * Disconnect wallet from emit
   *
   * @return  {<void>}
   */
  disconnectWallet(): void {
    if (confirm('Are you sure you want to disconnect this wallet?')) {
      this.clearWeb3TrackingFlags()
    }
  }

  /**
   * Save web3 tracking flags from localstorage
   *
   * @param   {string}  provider
   *
   * @return  }
   */
  saveWeb3TrackingFlags(provider: string) {
    localStorage.setItem('web3_connect_cached_provider', 'injected')
    localStorage.setItem('wallet_provider', provider)
  }

  mounted(): void {
    // check if account already exposed
    const web3ConnectCache = localStorage.getItem(
      'web3_connect_cached_provider'
    )
    const walletProvider = localStorage.getItem('wallet_provider')

    if (
      web3ConnectCache !== null &&
      web3ConnectCache === 'injected' &&
      walletProvider !== null
    ) {
      this.connectToWallet()
    }
  }
}
</script>

<style></style>
