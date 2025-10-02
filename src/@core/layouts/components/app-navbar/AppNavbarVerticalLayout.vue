<template>
  <div class="navbar-container d-flex content align-items-center">

    <!-- Nav Menu Toggler -->
    <ul class="nav navbar-nav d-xl-none">
      <li class="nav-item">
        <b-link
          class="nav-link"
          @click="toggleVerticalMenuActive"
        >
          <feather-icon
            icon="MenuIcon"
            size="21"
          />
        </b-link>
      </li>
    </ul>

    <!-- Brand / Left Col -->
    <div class="d-flex align-items-center flex-grow-1">
      <b-link to="/" class="d-flex align-items-center brand-link">
        <img src="/logo-ks.png" alt="KerenStake" class="brand-logo mr-50" />
      </b-link>
      <div class="d-none d-xl-flex" />
    </div>

    <b-navbar-nav class="nav align-items-center ml-auto">
      <search-bar />
      <notification-dropdown />
    </b-navbar-nav>
  </div>
</template>

<script>
import {
  BLink, BNavbarNav,
} from 'bootstrap-vue'
import SearchBar from './components/SearchBar.vue'

export default {
  components: {
    BLink,

    // Navbar Components
    BNavbarNav,
    SearchBar,
  },
  props: {
    toggleVerticalMenuActive: {
      type: Function,
      default: () => {},
    },
  },
}
</script>

<style scoped>
.brand-logo {
  width: 36px;
  height: 36px;
  border-radius: 8px;
}
.brand-link {
  padding: 0.25rem 0.5rem;
}
</style>
