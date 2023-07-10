type TargetContext = '_self' | '_parent' | '_blank' | '_top'

export const openWindow = (url: string, opts?: { target?: TargetContext; [key: string]: any }) => {
  const { target = '_blank', ...others } = opts || {}
  window.open(
    url,
    target,
    Object.entries(others)
      .reduce((preValue: string[], curValue) => {
        const [key, value] = curValue
        return [...preValue, `${key}=${value}`]
      }, [])
      .join(',')
  )
}

export const regexUrl =
  /^(?!mailto:)(?:http|https|ftp):\/\/(?:\S+(?::\S*)?@)?(?:(?:(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}\.(?:\d\d?|1\d\d|2[0-4]\d|25[0-4])|(?:[\da-z\u00A1-\uFFFF]+-?)*[\da-z\u00A1-\uFFFF]+(?:\.(?:[\da-z\u00A1-\uFFFF]+-?)*[\da-z\u00A1-\uFFFF]+)*\.[a-z\u00A1-\uFFFF]{2,})|localhost)(?::\d{2,5})?(?:([#/?])\S*)?$/i

export const strSlice = (str: any, front = 6, behind = 4): string => {
  if (typeof str !== 'string' || str.length === 0) return ''
  if (front + behind >= str.length) return str
  return `${str.slice(0, front)}${front < str.length ? '...' : ''}${
    behind === 0 ? '' : str.slice(-behind)
  }`
}

export const joinSlash = (arr: any[]) => {
  return arr
    .filter(Boolean)
    .map((e) => String(e).replaceAll('/', ''))
    .join('/')
}
