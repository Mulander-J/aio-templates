export default (init: any) => {
  const _parse = (str?: string) => {
    try {
      const obj = JSON.parse(str || 'null')
      if (!obj || Object.keys(obj).length <= 0) throw new Error('Null JSON')
      return obj
    } catch {
      return init
    }
  }

  const _stringify = (obj?: any) => {
    return JSON.stringify(Object.assign(init as any, obj))
  }

  return {
    init,
    _parse,
    _stringify
  }
}
