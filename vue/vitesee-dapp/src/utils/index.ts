import { isNumber } from './is'

export const strSlice = (str: any, front = 6, behind = 4): string => {
  if (typeof str !== 'string' || str.length === 0) return ''
  if (front + behind >= str.length) return str
  return `${str.slice(0, front)}${front < str.length ? '...' : ''}${behind === 0 ? '' : str.slice(-behind)
    }`
}

export function formatNumber(num: number | string, opt?: {
  decimals?: number
  decimal?: string
  separator?: string
  suffix?: string
  prefix?: string
  zero?: string
}) {
  if (!num) {
    if (opt?.zero) return opt?.zero
    num = 0
  }
  const { decimals = 2, decimal = '.', separator = ',', suffix = '', prefix = '' } = opt || {}
  num = Number(num).toFixed(decimals)
  num += ''
  const x = num.split('.')
  x[1] && (x[1] = x[1].replace(/0+?$/g, ''))
  let x1 = x[0]
  const x2 = x.length > 1 && +x[1] > 0 ? decimal + x[1] : ''
  const rgx = /(\d+)(\d{3})/
  if (separator && !isNumber(separator)) {
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + separator + '$2')
    }
  }
  return prefix + x1 + x2 + suffix
}

/**
 * @param {Date | number | string} time 需要转换的时间
 * @param fmt 需要转换的格式 如 yyyy-MM-dd、yyyy-MM-dd HH:mm:ss
 */
export function formatTime(time: Date | number | string, fmt = 'yyyy-MM-dd HH:mm:ss') {
  if (!time) return ''
  else {
    const date = new Date(time)
    const o: any = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'H+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds(),
      'q+': Math.floor((date.getMonth() + 3) / 3),
      S: date.getMilliseconds()
    }
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (const k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
        )
      }
    }
    return fmt
  }
}

export const detectMobile = () => navigator.userAgent.match(
  /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i,
)
export function hasScrollbar() {
  return document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight)
}
export function getScrollbarWidth() {
  const scrollDiv = document.createElement('div')
  scrollDiv.style.cssText
    = 'width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;'
  document.body.appendChild(scrollDiv)
  const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
  document.body.removeChild(scrollDiv)
  return scrollbarWidth
}

export const exportXls = (blob: any, fileName: string) => {
  const url = window.URL.createObjectURL(
    new Blob([blob], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    })
  )
  const link = document.createElement('a')
  link.style.display = 'none'
  link.href = url
  link.setAttribute('download', fileName)
  link.click()
  window.URL.revokeObjectURL(url)
}


const preventScroll = (e: Event) => { e.preventDefault() }
export const lockScroll = (flag: boolean) => {
  if (flag) {
    document.body.style.overflow = 'hidden'
    document.addEventListener('touchmove', preventScroll, false)
  } else {
    document.body.style.overflow = ''
    document.removeEventListener('touchmove', preventScroll, false)
  }
}