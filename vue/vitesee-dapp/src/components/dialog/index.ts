import Dialog from './Dialog.vue'
import { registerModule } from '~/modules'

export interface DialogProps {
  visible: boolean
  // Label
  title?: string
  content?: string
  okTxt?: string
  cancelTxt?: string
  // Layout
  width?: number | string
  customCls?: string
  zIndex?: number
  // Visible
  hideClose?: boolean
  hideFooter?: boolean
  // Handle
  lockOverlay?: boolean
  // Close CB
  onClose?: any
  // Connect Wallet
  walletMode?: boolean
}

type promptOpt = Omit<DialogProps, 'visible' | 'onClose'>

let caccheFlag: any = null

export const DPrompt
  = (option: promptOpt, custOpt?: { name: 'custom' | 'wallet', type: any, binds?: any }) => {
    caccheFlag = null
    return new Promise((reslove) => {
      const visible = ref(false)

      const div = document.createElement('div')
      document.body.appendChild(div)

      const onClose = (flag: boolean) => {
        app.unmount()
        div.remove()
        reslove(caccheFlag || flag)
      }

      const app = createApp({
        render() {
          return h(Dialog, {
            ...option,
            visible: visible.value,
            onClose
          }, () => custOpt && h(custOpt?.type, {
            ...custOpt?.binds,
            onTrigger: (data: any) => {
              caccheFlag = data
              visible.value = false
            }
          }))
        }
      })

      if (custOpt) {
        registerModule(app, ['i18n', 'store', 'wagmi'])
      }

      app.mount(div)
      setTimeout(() => { visible.value = true }, 300)
    })
  }