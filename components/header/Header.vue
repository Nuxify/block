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
      <v-spacer></v-spacer>
      <v-btn
        v-if="$vuetify.breakpoint.smAndDown"
        color="primary"
        x-large
        text
        @click="drawer = true"
      >
        <v-icon large>mdi-menu</v-icon>
      </v-btn>
      <div v-if="$vuetify.breakpoint.mdAndUp">
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
    <!-- drawer -->
    <v-navigation-drawer
      v-if="$vuetify.breakpoint.smAndDown"
      v-model="drawer"
      app
      width="350px"
      class="nav__bar--container"
    >
      <div class="nav__bar--content">
        <v-row no-gutters align="center">
          <nuxt-link to="/">
            <img
              src="/logo/Nuxify-Logo-withText.svg"
              lazy-src="/logo/Nuxify-Logo-withText.svg"
              alt="Nuxify Logo"
              width="180"
              height="66"
              class="ma-1"
            />
          </nuxt-link>
          <v-spacer />

          <v-btn icon color="dark__gray" class="mr-4" @click="drawer = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-row>

        <v-list dense class="tabs__control--container">
          <v-list-item
            v-for="(page, key) in pages"
            :key="key"
            :to="page.to"
            class="font-weight-bold pl-0"
          >
            <v-list-item-title class="ml-3 my-3 py-3 body-1">
              {{ page.title }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
        <v-row no-gutters class="align-center connect__wallet--container px-4">
          <v-btn
            v-if="!web3_wallet_address"
            dark
            tile
            block
            height="44"
            width="auto"
            class="body-2 text-none primary"
            @click="web3_set_connect_wallet_dialog(true)"
          >
            Connect Wallet
          </v-btn>
          <v-btn
            v-else
            dark
            depressed
            tile
            block
            height="44"
            width="auto"
            class="body-2 text-none primary"
            @click="disconnectWallet"
          >
            <div>
              <h1 class="body-2">{{ walletAddress }}</h1>
            </div>
          </v-btn>
        </v-row>
      </div>
    </v-navigation-drawer>
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

  drawer: boolean = false

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

<style lang="scss" scoped>
.header__container {
  height: 80px;
}

.nav__bar--container {
  z-index: 5 !important;
  .nav__bar--content {
    position: relative;
    height: 100%;
    .tabs__control--container {
      margin-top: 50px;
    }
    .connect__wallet--container {
      position: absolute;
      bottom: 2%;
      left: 0;
      right: 0;
    }
  }
}
</style>
