import { configureChains, createClient, watchAccount, watchNetwork } from '@wagmi/core'

/*  Providers  */

import { publicProvider } from '@wagmi/core/providers/public'

/*  Connectors  */

import { InjectedConnector } from '@wagmi/core/connectors/injected'
// import { WalletConnectConnector } from '@wagmi/core/connectors/walletConnect'
import { WalletConnectLegacyConnector } from '@wagmi/core/connectors/walletConnectLegacy'
import { goerli, mainnet } from '@wagmi/core/chains'

import useWagmi from '~/hooks/useWagmi'

import LogoMetaMask from '~/assets/imgs/metamask.svg'

export default () => {

  // generate providers
  const { chains, provider, webSocketProvider } = configureChains(
    [mainnet, goerli],
    [publicProvider()],
  )

  // setup the client
  createClient({
    provider,
    webSocketProvider,
    autoConnect: false,
    connectors: [
      new InjectedConnector({
        chains,
        options: {
          name: 'MetaMask',
          // shimChainChangedDisconnect: true,
          shimDisconnect: true,

          /* extend values */

          ...{ logo: LogoMetaMask, unReady: 'http://metamask.io/' },
        },
      }),
      new WalletConnectLegacyConnector({
        chains,
        options: {
          qrcode: true,

          /* extend values */

          ...{ icon: 'i-custom:walletconnect', name: 'WalletConnect' },
        },
      }),
      // new WalletConnectConnector({
      //   chains: [mainnet],
      //   options: {
      //     showQrModal: true,
      //     projectId: 'YOUR PROJECTID',
      //     qrModalOptions: {
      //       enableExplorer: false,
      //       themeVariables: {
      //         '--w3m-z-index': '4000',
      //       },
      //     },
      //     /* extend values */

      //     ...{ logo: LogoWalletConnect },
      //   },
      // }),
    ],
  })

  const { setAccount, setNetwork } = useWagmi()

  watchAccount(setAccount)
  watchNetwork(setNetwork)
}
