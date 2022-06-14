<template>
  <div></div>
</template>

<script lang="ts">
import { Component, Vue, namespace, Prop, Watch } from 'nuxt-property-decorator'

const WEB3_STORE = namespace('web3')

interface WalletInterface {
  name?: string
  logo?: string
  provider: string
  css: string
}

@Component
export default class WalletHandler extends Vue {
  @WEB3_STORE.Action('setWalletAddress') web3_set_wallet_address!: (
    payload: string
  ) => void

  @WEB3_STORE.Action('setConnectWalletDialog')
  global_set_connect_wallet_dialog!: (payload: boolean) => void

  @Prop({ default: 0 }) disconnectWalletTimestamp!: number
  @Prop({ default: {} as WalletInterface }) wallet!: WalletInterface

  @Watch('wallet', { immediate: true, deep: true })
  onWalletChange(val: WalletInterface): void {
    if (val.provider.length > 0) {
      this.connectToWallet(val)
    }
  }

  @Watch('disconnectWalletTimestamp')
  onDisconnectWalletWalletTimestamp(val: number): void {
    if (val > 0) {
      this.disconnectWallet()
    }
  }

  /**
   * Connect to wallet
   *
   * @param   {WalletInterface<void>}  wallet
   *
   * @return  {Promise<void>}
   */
  async connectToWallet(wallet: WalletInterface): Promise<void> {
    switch (wallet.provider) {
      case 'metamask':
        try {
          const accounts: string[] = await (window as any).ethereum.request({
            method: 'eth_requestAccounts',
          })

          // init global web3
          this.$web3.initWeb3Provider((window as any).ethereum)

          // check and switch network
          this.switchMetamaskNetwork()

          // get wallet address
          const [account] = accounts
          this.web3_set_wallet_address(account)

          // save web3 flags
          this.saveWeb3TrackingFlags(wallet.provider)
          this.global_set_connect_wallet_dialog(false)
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
          return
        }

        // subscribe to accounts change
        ;(window as any).ethereum.on(
          'accountsChanged',
          (accounts: string[]) => {
            if (accounts.length === 0) {
              this.clearWeb3TrackingFlags()

              alert('Wallet successfully disconnected')
              return
            }

            this.clearWeb3TrackingFlags()
            alert('Please connect your wallet again.')
            location.reload()
          }
        )

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
        break

      default:
        this.$toast.error('Cannot connect to wallet')
    }
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
          params: [{ chainId: '0x61' }], // write the chainId here
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
      if (walletProvider === 'metamask')
        this.connectToWallet({
          provider: walletProvider,
          css: 'metamask--container',
        })
    }
  }
}
</script>

<style></style>
