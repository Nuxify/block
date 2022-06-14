<template>
  <div class="header__container">
    <v-app-bar
      app
      hide-on-scroll
      height="80"
      :class="[{ 'px-12': $vuetify.breakpoint.mdAndUp }]"
      flat
      color="white"
    >
      <nuxt-link to="/">
        <img
          src="/logo/Nuxify-Logo-withText.svg"
          lazy-src="/logo/Nuxify-Logo-withText.svg"
          alt="Nuxify Logo"
          width="180"
          height="66"
        />
      </nuxt-link>
      <v-spacer />
      <v-btn
        v-for="page in pages"
        :key="page.icon"
        :to="page.link"
        x-large
        text
        :color="activePage == page.name ? 'primary' : 'accent'"
        class="font-weight-bold text-capitalize hidden-sm-and-down"
        @click="onPageClick(page)"
      >
        {{ page.title }}
        <div
          class="slider mt-6"
          :class="[{ 'd-none': activePage != page.name }]"
        ></div>
      </v-btn>

      <v-menu offset-y min-width="100vw">
        <template #activator="{ on, attrs }">
          <v-btn
            color="primary"
            x-large
            v-bind="attrs"
            text
            class="hidden-md-and-up"
            v-on="on"
          >
            <v-icon large>mdi-menu</v-icon>
          </v-btn>
        </template>
        <v-list color="white" flat nav tile elevation="0">
          <v-list-item
            v-for="(page, key) in pages"
            :key="key"
            :to="page.to"
            class="font-weight-bold"
          >
            <v-list-item-title
              class="ml-3 my-3"
              :class="[
                { 'primary--text': activePage == page.name },
                { 'accent--text': activePage != page.name },
              ]"
              >{{ page.title }}
              <div
                class="slider mt-3"
                :class="[{ 'd-none': activePage != page.name }]"
              ></div>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-spacer></v-spacer>
      <div>
        <v-btn
          v-if="!web3_wallet_address"
          dark
          tile
          height="44"
          width="159"
          class="body-2 text-none primary"
          @click="web3_set_connect_wallet_dialog(true)"
          >Connect Wallet
        </v-btn>
        <v-btn
          v-else
          dark
          tile
          height="44"
          width="159"
          class="body-2 text-none primary"
          @click="disconnectWallet"
        >
          {{ walletAddress }}
        </v-btn>
      </div>
    </v-app-bar>
  </div>
</template>

<script lang="ts">
import { Component, Vue, namespace } from 'nuxt-property-decorator'

const WEB3_STORE = namespace('web3')

interface Item {
  name: string
  title: string
  to: string
}

@Component
export default class Header extends Vue {
  @WEB3_STORE.Action('setConnectWalletDialog')
  web3_set_connect_wallet_dialog!: (payload: boolean) => void

  @WEB3_STORE.State('walletAddress') web3_wallet_address!: string

  pages: Item[] = [
    {
      name: 'index',
      title: 'Home',
      to: '/',
    },
    {
      name: 'users',
      title: 'Users',
      to: '/users',
    },
    {
      name: 'about',
      title: 'About',
      to: '/about',
    },
  ]

  get activePage(): string {
    if (this.$route?.name === undefined || this.$route?.name === null) {
      return ''
    }
    if (this.$route?.name === 'users-id') {
      return 'users'
    }
    return this.$route?.name
  }

  get walletAddress(): string {
    return `${this.web3_wallet_address.substring(
      0,
      5
    )}...${this.web3_wallet_address.substring(
      this.web3_wallet_address.length - 4
    )}`
  }

  /**
   * Disconnect wallet
   *
   * @return  {<void>}
   */
  disconnectWallet(): void {
    this.$emit('disconnectWallet')
  }

  /**
   * return to selected page/route
   * @param Item     page item object
   */
  onPageClick(item: Item): void {
    this.$router.push({ name: item.name })
  }
}
</script>

<style scoped>
.header__container {
  height: 80px;
}
</style>
