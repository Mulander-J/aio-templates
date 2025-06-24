import { ComponentPublicInstance } from 'vue'
import NotifyComp from './Notifier.vue'

export interface NotifyProps {
  type?: 'normal' | 'success' | 'error' | 'warn' | 'pending'
  title?: string
  content?: string
  duration?: number
  hideClose?: boolean
  verticalOffset: number
  onClosed: Function
  afterClosed?: Function
}

type NotifyOpt = Omit<NotifyProps, 'onClosed' | 'verticalOffset'>

type InstanceType = {
  id: string;
  vm: ComponentPublicInstance<any>;
}

const _vectOffset = 24

const instances: InstanceType[] = []

let seed = 1

const removeInstance = (id: string, removeHeight: number): void => {
  const index = instances.findIndex(item => item.id === id)
  const len = instances.length

  // remove instance
  instances.splice(index, 1)

  if (len < 1) return

  for (let i = index; i < len - 1; i++) {
    const inst = instances[i].vm
    inst.bottomOffset = inst.bottomOffset - removeHeight - _vectOffset
  }
}

const initNotify = (option: NotifyOpt, custOpt?: { name: string, type: any, binds?: any }): void => {
  const id = `notify_${seed++}`
  const container = document.createElement('div')
  container.id = id
  document.body.appendChild(container)

  //  resort offset
  let verticalOffset = _vectOffset
  instances.forEach(item => {
    verticalOffset += item.vm.$el.offsetHeight + _vectOffset
  })

  const { duration = 3 * 1000, type = 'normal' } = option

  const instance = createApp({
    data() {
      return {
        bottomOffset: verticalOffset
      }
    },
    methods: {
      closedFunc(height: number): void {
        removeInstance(id, height)
        document.body.removeChild(container)
        instance.unmount()
        option?.afterClosed && option?.afterClosed()
      }
    },
    render() {
      return h(NotifyComp, {
        ...option,
        content: custOpt ? '1' : option?.content,
        type,
        duration,
        verticalOffset: this.bottomOffset,
        onClosed: this.closedFunc
      }, () => custOpt && h(custOpt?.type, {
        ...custOpt?.binds,
        onTrigger: () => { this.closedFunc() }
      }))
    }
  })

  instances.push({
    id,
    vm: instance.mount(container)
  })
}

const Notify = (_opt: NotifyOpt, custOpt?: { name: string, type: any, binds?: any }) => initNotify(_opt, custOpt)

Notify.success = (_opt: NotifyOpt, custOpt?: { name: string, type: any, binds?: any }) => initNotify({ type: 'success', ..._opt }, custOpt)
Notify.error = (_opt: NotifyOpt, custOpt?: { name: string, type: any, binds?: any }) => initNotify({ type: 'error', ..._opt }, custOpt)
Notify.warn = (_opt: NotifyOpt, custOpt?: { name: string, type: any, binds?: any }) => initNotify({ type: 'warn', ..._opt }, custOpt)
Notify.pending = (_opt: NotifyOpt, custOpt?: { name: string, type: any, binds?: any }) => initNotify({ type: 'pending', ..._opt }, custOpt)

export default Notify
