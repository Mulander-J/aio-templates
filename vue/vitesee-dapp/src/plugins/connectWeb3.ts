import { DPrompt } from "~/components/dialog"
import WalletFlow from "~/layouts/WalletFlow.vue"

export const ConnectWeb3 = () => DPrompt({
    title: 'Connect your wallet to login',
    hideFooter: true,
    width: 550
}, {
    name: 'wallet',
    type: WalletFlow
})