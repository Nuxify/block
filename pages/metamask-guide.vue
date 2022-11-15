<template>
  <div class="p-relative">
    <v-container fluid class="metamask__guide--container">
      <h1>How to use Metamask</h1>
      <!-- Step 1 -->
      <h2>Step 1: Download and Install Metamask</h2>
      <div>
        <ul>
          <li>
            Download metamask
            <a href="https://metamask.io/download/" target="_blank"> here </a>
          </li>
          <li>
            Click on <span>Install MetaMask</span> <br />
            <img
              src="/images/metamask-guide-steps/step-1-download.png"
              lazy-src="/images/metamask-guide-steps/step-1-download.png"
              alt="Step 1 Download"
            />
          </li>
          <li>
            Click <span>Add to Chrome</span> <br />
            <img
              src="/images/metamask-guide-steps/step-1-add-to-chrome.png"
              lazy-src="/images/metamask-guide-steps/step-1-add-to-chrome.png"
              alt="Step 1 Add to chrome"
            />
          </li>

          <li>
            Click <span>Add Extension</span> <br />
            <img
              src="/images/metamask-guide-steps/step-1-add-extension.png"
              lazy-src="/images/metamask-guide-steps/step-1-add-extension.png"
              alt="Step 1 Add extension"
            />
          </li>
        </ul>
      </div>
      <!-- Step 2 -->
      <h2>Step 2: Create an Account</h2>
      <div>
        <ul>
          <li>
            Click on the extension icon in the upper right corner to open
            MetaMask. <br />
            <img
              src="/images/metamask-guide-steps/step-2-extension-icon.png"
              lazy-src="/images/metamask-guide-steps/step-2-extension-icon.png"
              alt="Step 2 Extension icon"
            />
          </li>
          <li>
            Click <span>Get started</span> and then click <span>I agree </span>
            <br />
            <img
              src="/images/metamask-guide-steps/step-2-get-started.png"
              lazy-src="/images/metamask-guide-steps/step-2-get-started.png"
              alt="Step 2 Get started"
            />
          </li>
          <li>
            Click <span>Create a Wallet</span> <br />
            <img
              src="/images/metamask-guide-steps/step-2-create-wallet.png"
              lazy-src="/images/metamask-guide-steps/step-2-create-wallet.png"
              alt="Step 2 Create wallet"
            />
          </li>
          <li>
            You will be prompted to create a new password. Click
            <span>Create</span>. <br />
            <img
              src="/images/metamask-guide-steps/step-2-create-password.png"
              lazy-src="/images/metamask-guide-steps/step-2-create-password.png"
              alt="Step 2 Create password"
            />
          </li>
          <li>Proceed by clicking <span>Next</span></li>
          <li>
            Click <span>Reveal Secret Words</span>. There you will see a 12
            words seed phrase. <br />
            <h3>
              *This is really important and usually not a good idea to store
              digitally, so take your time and write it down.
            </h3>
            <br />
            <img
              src="/images/metamask-guide-steps/step-2-secret-recovery-phrase.png"
              lazy-src="/images/metamask-guide-steps/step-2-secret-recovery-phrase.png"
              alt="Step 2 Secret recovery phrase"
            />
          </li>
          <li>
            Verify your secret phrase by selecting the previously generated
            phrase in order. Click <span>Confirm</span>.
            <br />
            <img
              src="/images/metamask-guide-steps/step-2-confirm-secret-recovery-phrase.png"
              lazy-src="/images/metamask-guide-steps/step-2-confirm-secret-recovery-phrase.png"
              alt="Step 2 Confirm secret recovery phrase"
            />
          </li>
        </ul>
      </div>

      <!-- Step 3 -->
      <h2>Step 3: Depositing funds</h2>
      <div>
        <ul>
          <li>
            Click <span>Buy</span><br />
            <img
              src="/images/metamask-guide-steps/step-3-click-buy.png"
              lazy-src="/images/metamask-guide-steps/step-3-click-buy.png"
              alt="Step 3 Click buy"
            />
          </li>
          <li>
            Select crypto payment service you want to use. <br />
            <img
              src="/images/metamask-guide-steps/step-3-crypto-payment-service.png"
              lazy-src="/images/metamask-guide-steps/step-3-crypto-payment-service.png"
              alt="Step 3 Crypto payment service"
            />
          </li>
          <li>
            Click on <span>View Account</span> to view your wallet address.
            <br />
            <img
              src="/images/metamask-guide-steps/step-3-view-account.png"
              lazy-src="/images/metamask-guide-steps/step-3-view-account.png"
              alt="Step 3 View account"
            />
          </li>
          <li>
            You can now see your public address and share it with other people.
          </li>
        </ul>
      </div>
    </v-container>
    <!-- <v-btn to="/" tile height="44" color="primary" class="back--btn px-4">
      <v-icon size="20" class="mr-2">mdi-arrow-left</v-icon> Back to Page
    </v-btn> -->
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  head() {
    return {
      title: 'Metamask Guide',
    }
  },
  layout: 'empty',
})
export default class MetamaskGuide extends Vue {}
</script>

<style lang="scss" scoped>
.metamask__guide--container {
  max-width: 1100px;
  padding: 100px;
  h1 {
    font-size: 45px;
    text-align: center;
    margin-bottom: 40px;
  }
  h2 {
    font-size: 28px;
    margin-top: 50px;
    margin-bottom: 10px;
  }
  ul {
    margin-left: 20px;
    margin-bottom: 20px;
    list-style-images: url('/icons/arrow-right-small.png');
    li {
      font-size: 16px;
      margin-bottom: 5px;
      margin-top: 40px;
      img {
        width: 100%;
        max-width: 800px;
        margin-top: 10px;
        box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
      }
      h3 {
        font-size: 12px;
        color: #cb2027;
        margin-left: 10px;
      }
      span {
        font-weight: 600;
      }
    }
  }
}
.back--btn {
  position: absolute;
  top: 50px;
  left: 50px;
}

@media (max-device-width: 959px) {
  .metamask__guide--container {
    padding: 20px;
    margin-bottom: 100px;
    h1 {
      font-size: 35px;
      line-height: 1;
    }
    h2 {
      font-size: 24px;
    }
    ul {
      margin-left: 0;
      li {
        h3 {
          margin-left: 0;
        }
      }
    }
  }

  .back--btn {
    position: absolute;
    top: 99%;
    left: 50%;
    transform: translate(-50%);
  }
}

@media (max-device-width: 599px) {
  .back--btn {
    top: 98%;
  }
}
</style>
