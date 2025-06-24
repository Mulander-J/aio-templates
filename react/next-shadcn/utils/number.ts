import BigNumber from 'bignumber.js'
import { isNumber } from './is'

interface NumParserOpt {
    /**
     * 小数点符号
     */
    decimal?: string
    /**
     * 小数精度
     */
    decimals?: number
    /**
     * 保留小数位零值
     */
    keepDecimal?: boolean
    /**
     * 整数分隔符号
     */
    separator?: string
    /**
     * 后缀
     */
    suffix?: string
    /**
     * 前缀
     */
    prefix?: string
    /**
     * 空值文案
     */
    zero?: string
    /**
     * 大数处理
     */
    bigN?: boolean
}

export function formatNumber(num: number | string, opt?: NumParserOpt) {
    if (!num || !Number(num)) {
        if (opt?.zero) return opt?.zero
        num = 0
    }
    const {
        decimals = 2,
        decimal = '.',
        separator = ',',
        suffix = '',
        prefix = '',
        bigN = false,
        keepDecimal = false
    } = opt || {}
    num = bigN ? new BigNumber(num).toFixed(decimals, 1) : Number(num).toFixed(decimals)

    if (Number(num) === 0 && opt?.zero) return opt?.zero

    num += ''
    const x = num.split('.')
    x[1] && (x[1] = x[1].replace(/0+?$/g, ''))
    let x1 = x[0]
    // const _x2 = x.length > 1 && +x[1] > 0 ? decimal + x[1] : ''
    const x2 = keepDecimal
        ? decimal + (x?.[1] || '0').padEnd(decimals, '0')
        : x.length > 1 && +x[1] > 0
            ? decimal + x[1]
            : ''
    const rgx = /(\d+)(\d{3})/
    if (separator && !isNumber(separator)) {
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, `$1${separator}$2`)
        }
    }
    return prefix + x1 + x2 + suffix
}

export function fromUnit(num?: number | string, times: number = 18, opt?: NumParserOpt) {
    const n = new BigNumber(num || '').div(`1e${times}`)
    return formatNumber(n.toString(), {
        bigN: true,
        ...opt
    })
}

export function toUnit(num?: number | string, times: number = 18, opt?: NumParserOpt) {
    const n = new BigNumber(num || '').times(`1e${times}`)
    return formatNumber(n.toString(), {
        bigN: true,
        ...opt
    })
}