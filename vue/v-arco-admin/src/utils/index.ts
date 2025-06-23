import { isNumber } from './is'

/**
 * 拼接字符串去重
 * @param str 目标字符串
 * @param symbol 分割符
 * @returns
 */
export const deDuplicateStr = (str: string, symbol = ',') => {
  return Array.from(new Set(str.split(symbol).filter(Boolean))).join(symbol)
}

export const strSlice = (str: any, front = 6, behind = 4): string => {
  if (typeof str !== 'string' || str.length === 0) return ''
  if (front + behind >= str.length) return str
  return `${str.slice(0, front)}${front < str.length ? '...' : ''}${
    behind === 0 ? '' : str.slice(-behind)
  }`
}

export function formatNumber(
  num: number | string,
  opt?: {
    decimals?: number
    decimal?: string
    separator?: string
    suffix?: string
    prefix?: string
    zero?: string
  }
) {
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
      x1 = x1.replace(rgx, `$1${separator}$2`)
    }
  }
  return prefix + x1 + x2 + suffix
}

export const numParse = (
  num?: string | number,
  option?: {
    /**
     * 是否需要除以倍数
     */
    fromDB?: boolean
    /**
     * 倍数
     */
    decimal?: number
    max?: number
    min?: number
  }
) => {
  const _d = option?.decimal || 100

  num = Number(num)

  if (option?.fromDB) return num / _d

  if (option?.max) num = Math.min(num, option.max)
  if (option?.min) num = Math.max(num, option.min)

  return Number((num * _d).toFixed())
}
