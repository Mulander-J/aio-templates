export const strSlice = (str: any, front = 6, behind = 4): string => {
    if (typeof str !== 'string' || str.length === 0) return ''
    if (front + behind >= str.length) return str
    return `${str.slice(0, front)}${front < str.length ? '...' : ''}${behind === 0 ? '' : str.slice(-behind)
        }`
}