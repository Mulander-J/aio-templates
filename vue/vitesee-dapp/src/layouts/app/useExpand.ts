const expands = ref<any[]>([])
const isExpand = (name: any) => expands.value.includes(name)

export default () => {
  const clear = () => {
    expands.value = []
  }
  const open = (name: any) => {
    expands.value = [...expands.value, name]
  }
  const close = (name: any) => {
    expands.value = expands.value.filter(e => e !== name)
  }

  const trigger = (name: any) => {
    if (isExpand(name))
      close(name)

    else
      open(name)
  }

  return {
    clear,
    open,
    close,
    trigger,
    isExpand,
  }
}
