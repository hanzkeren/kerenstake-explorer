<template>
  <div class="home-sticky-header">
    <div class="d-flex align-items-center justify-content-between">
      <!-- Left: Brand logo -->
      <div class="d-flex align-items-center">
        <img src="/logo-ks.png" alt="KerenStake" class="home-brand-logo" />
      </div>

      <!-- Right: Actions -->
      <b-nav
        align="right"
        style="width:100%"
        class="nav text-right text-nowrap ml-auto"
      >
        <b-button
          v-ripple.400="'rgba(255, 255, 255, 0.15)'"
          variant="primary"
          class="btn-icon mt-25"
          :to="{ name: 'accounts' }"
        >
          <feather-icon icon="KeyIcon" />
          <span class="align-middle ml-25">Wallet</span>
        </b-button>
      </b-nav>
    </div>
  </div>
</template>

<script>
import { BNav, BButton } from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import Locale from '@/@core/layouts/components/app-navbar/components/Locale.vue'

export default {
  components: {
    BNav,
    BButton,
    Locale,
  },
  directives: {
    Ripple,
  },
}
</script>

<style scoped>
.home-sticky-header {
  position: sticky;
  top: 8px; /* sit just below the main navbar area */
  z-index: 996; /* below main navbar z-index 997 */
  background: rgba(17, 20, 26, 0.85);
  border: 1px solid rgba(255,255,255,0.04);
  backdrop-filter: saturate(160%) blur(10px);
  border-radius: 12px;
  padding: 8px 12px;
  margin-bottom: 12px;
}
.home-brand-logo {
  width: 40px;
  height: 40px;
  border-radius: 10px;
}
@media (max-width: 600px) {
  .home-sticky-header {
    backdrop-filter: saturate(140%) blur(6px);
    background: rgba(17, 20, 26, 0.92);
  }
}
</style>
