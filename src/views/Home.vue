<template>
  <div class="text-center container-lg">
    <full-header />
    <!-- brand logo moved to sticky header -->

    <!-- Simple headline + copy (text only) -->
    <div class="mb-2 mx-auto ks-hero">
      <h1 class="ks-title">KERENSTAKE<span class="ks-dot">.</span></h1>
      <div class="ks-subtitle">EXPLORER</div>
    </div>

    <div>
      <b-row>
        <b-col
          v-for="(data,index) in chains"
          :key="index"
          v-observe-visibility="(visible) => visibilityChanged(visible, data)"
          sm="6"
          md="4"
          lg="3"
          xl="3"
          class="mb-2"
        >
          <router-link :to="data.chain_name" class="text-decoration-none">
            <div class="chain-card w-100">
              <div class="d-flex align-items-center">
                <img :src="data.logo" alt="logo" class="chain-logo" width="32" height="32" loading="lazy" decoding="async"/>
                <span class="chain-name">{{ data.chain_name }}</span>
              </div>
            </div>
          </router-link>
        </b-col>

        <!-- no result found -->
        <b-col
          v-show="!chains"
          cols="12"
          class="text-center"
        >
          <h4 class="mt-4">
            No blockchain found!!
          </h4>
        </b-col>
        <!--/ no result found -->
      </b-row>
    </div>
    <app-footer class="mb-1" />
  </div>
</template>

<script>
/* eslint-disable global-require */
import {
  BLink, BAvatar, BRow, BCol, BCard, BCardText, BCardTitle, BDropdown, BDropdownItem,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import VuexyLogo from '@core/layouts/components/Logo.vue'
import store from '@/store/index'
import { timeIn, toDay, getLocalChains } from '@/libs/utils'
import AppFooter from '@/@core/layouts/components/AppFooter.vue'
import FullHeader from './components/FullHeader.vue'

export default {
  components: {
    BLink,
    BAvatar,
    BRow,
    BCol,
    BCard,
    BCardText,
    BCardTitle,
    BDropdown,
    BDropdownItem,
    VuexyLogo,
    AppFooter,
    FullHeader,
  },
  directives: {
    Ripple,
  },
  data() {
    const chains = this.$store.state.chains.config
    return {
      chains,
      downImg: require('@/assets/images/pages/under-maintenance.svg'),
    }
  },
  computed: {
    imgUrl() {
      if (store.state.appConfig.layout.skin === 'dark') {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.downImg = require('@/assets/images/pages/under-maintenance-dark.svg')
        return this.downImg
      }
      return this.downImg
    },
  },
  beforeCreate() {
    const keys = Object.keys(getLocalChains())
    if (keys.length === 1) {
      this.$router.push(`/${keys[0]}`)
    }
  },
  methods: {
    // status removed per request
    fetch(k) {
      const chain = this.chains[k]
      if (chain.api) {
        const index = localStorage.getItem(`${chain.chain_name}-api-index`) || 0
        const host = Array.isArray(chain.api) ? chain.api[index] : chain.api
        fetch(`${host}/blocks/latest`).then(res => res.json()).then(b => {
          const { header } = b.block
          this.$set(chain, 'height', header.height)
          this.$set(chain, 'time', toDay(header.time))
          this.$set(chain, 'variant', timeIn(header.time, 3, 'm') ? 'danger' : 'success')
        })
      }
    },
    visibilityChanged(isVisible, chain) {
      this.isVisible = isVisible
      const idle = this.chains[chain.chain_name]
      if (isVisible && !idle.loaded) {
        this.$set(idle, 'loaded', true)
        this.fetch(chain.chain_name)
      }
    },
  },
}
</script>

<style scoped>
.ks-hero {
  text-align: center;
  margin-top: 28px; /* increased spacing from sticky header */
}
.ks-title {
  font-size: 2.25rem; /* ~ text-[2.25rem] */
  letter-spacing: 0.07em;
  color: #ffffff; /* text-white */
  font-weight: 800; /* font-heading bold */
  margin-bottom: 0.25rem;
}
@media (min-width: 640px) { /* sm:text-5xl */
  .ks-title { font-size: 3rem; }
}
.ks-dot {
  color: #22D3EE; /* accent cyan */
  display: inline-block;
  animation: ks-dot-run 1.6s ease-in-out infinite;
}
@keyframes ks-dot-run {
  0%, 100% { transform: translateX(0); opacity: 1; }
  50% { transform: translateX(6px); opacity: 0.85; }
}
.ks-subtitle {
  color: #ffffff;
  letter-spacing: 0.4em;
  font-weight: 700;
  font-size: 1rem;
}
@media (min-width: 640px) {
  .ks-subtitle { font-size: 1.125rem; }
}
.earnings-card {
  background: #11141a;
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 14px;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}
.earnings-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 24px rgba(0,0,0,0.35);
  border-color: rgba(34, 211, 238, 0.35);
}

/* Simple chain card styling */
.chain-card {
  background: #11141a;
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 6px; /* rounded-sm */
  padding: 12px; /* ~ p-3.5 */
  color: #fff;
  transition: border-color 0.2s ease, transform 0.15s ease;
}
.chain-card:hover { border-color: rgba(34,211,238,0.35); transform: translateY(-1px); }
.chain-logo { width: 32px; height: 32px; border-radius: 8px; object-fit: cover; margin-right: 8px; }
.chain-name { text-transform: uppercase; letter-spacing: 0.08em; font-size: 11px; }
.chain-meta { color: rgba(255,255,255,0.7); font-size: 12px; }
.chain-desc { color: rgba(255,255,255,0.55); font-size: 12px; margin-top: 4px; }
.status-badge { color: #22D3EE; display: inline-flex; align-items: center; font-size: 12px; }
.status-dot { width: 6px; height: 6px; border-radius: 9999px; background: #22D3EE; display: inline-block; margin-right: 6px; box-shadow: 0 0 0 3px rgba(34,211,238,0.15); }
</style>
