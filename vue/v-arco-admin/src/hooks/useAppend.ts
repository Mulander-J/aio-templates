export default (fetchFunc: any) => {
  const pageSet = reactive({
    pageNum: 1,
    pageSize: 100
  })

  const state = reactive<{
    options: any[]
    loading: boolean
    total: number
  }>({
    options: [],
    loading: false,
    total: 0
  })

  const appendData = async () => {
    if (state.loading) return
    state.loading = true
    try {
      const { list, total } = await fetchFunc(pageSet)
      state.options = [...state.options, ...list]
      state.total = total
    } catch {
    } finally {
      state.loading = false
    }
  }

  const handleVisible = async (visible: boolean) => {
    visible && state.options.length <= 0 && (await appendData())
  }

  const handleNextPage = async () => {
    console.log('Scroll to Next')
    if (state.options.length < state.total) {
      pageSet.pageNum++
      await appendData()
    }
  }
  const initData = async (force?: boolean) => {
    force && (state.options.length = 0)
    state.options.length <= 0 && (await appendData())
  }

  return {
    state,
    pageSet,
    methods: {
      initData,
      appendData,
      handleVisible,
      handleNextPage
    }
  }
}
