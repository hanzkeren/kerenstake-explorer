import store from '@/store'
import { isTestnet } from '../../libs/utils'

function processMenu() {
  const chainMenus = []
  const blockchains = []
  Object.keys(store.state.chains.config).forEach(chain => {
    const menu = {
      title: chain,
      logo: store.state.chains.config[chain].logo,
      route: { name: 'dashboard', params: { chain } },
    }
    blockchains.push(menu)
  })

  if (blockchains.length > 1) {
    chainMenus.push({ header: 'ecosystem' })
    chainMenus.push({
      title: 'blockchains',
      children: blockchains,
      tag: `${blockchains.length}`,
      icon: '/logo-ks.png',
    })
  }
  chainMenus.push({ header: 'LINKS' })
  chainMenus.push({ title: 'Website', href: 'https://kerenstake.com', icon: 'ChromeIcon' })
  chainMenus.push({ title: 'Explorer', href: 'https://explorer.kerenstake.com', icon: 'CompassIcon' })
  chainMenus.push({ title: 'Github', href: 'https://github.com/hanzkeren', icon: 'GithubIcon' })

  return chainMenus
}

export default processMenu()
