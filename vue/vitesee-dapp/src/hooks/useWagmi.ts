// account状态
const _account = ref<any>({})
const _network = ref<any>({})

const setAccount = (account: any) => {
  console.log('Account Changed', account)
  _account.value = toRaw(account)
}
const setNetwork = (network: any) => {
  console.log('Network Changed', network)
  _network.value = toRaw(network)
}

/* Computeds */

const address = computed(() => _account.value?.address)
const chain = computed(() => _network.value?.chain?.network)
const wallet = computed(() => String(_account.value?.connector?.id || '').toLowerCase())
const isConnected = computed(() => _account.value?.isConnected)

export default () => {
  return {
    address,
    chain,
    wallet,
    isConnected,
    setAccount,
    setNetwork,
  }
}
