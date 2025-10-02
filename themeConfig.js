// Theme Colors
// Initially this will be blank. Later on when app is initialized we will assign bootstrap colors to this from CSS variables.
export const $themeColors = {}

// App Breakpoints
// Initially this will be blank. Later on when app is initialized we will assign bootstrap breakpoints to this object from CSS variables.
export const $themeBreakpoints = {}

// APP CONFIG
export const $themeConfig = {
  app: {
    appName: 'KerenStake', // Branding
    // eslint-disable-next-line global-require
    appLogoImage: '/logo-ks.png', // Branding logo
  },
  layout: {
    isRTL: false,
    skin: 'dark', // light, dark, bordered, semi-dark
    routerTransition: 'slide-fade', // zoom-fade, slide-fade, fade-bottom, fade, zoom-out, none
    type: 'vertical', // vertical, horizontal
    contentWidth: 'full', // full, boxed
    menu: {
      hidden: false,
      isCollapsed: false,
    },
    navbar: {
      // Make navbar sticky and modern
      type: 'sticky', // static , sticky , floating, hidden
      backgroundColor: '', // BS color options [primary, success, etc]
    },
    footer: {
      type: 'static', // static, sticky, hidden
    },
    customizer: false,
    enableScrollToTop: true,
  },
}
