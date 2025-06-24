import useClipboard from 'vue-clipboard3'
import Notify from '~/components/notify'

let copyText = ''

export const copy = {
    mounted(el: HTMLElement, binding: { value: string }) {
        el.addEventListener(
            'click',
            async () => {
                copyText = binding.value
                const { toClipboard } = useClipboard()
                try {
                    if (!copyText) return
                    await toClipboard(copyText)
                    Notify.success({ title: 'Copy succeeded' })
                } catch (e) {
                    Notify.error({ title: 'Copy Fail' })
                    console.error(e)
                }
            },
            true
        )
    },
    updated(el: HTMLElement, binding: { value: string }) {
        copyText = binding.value
    }
}