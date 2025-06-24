import dayjs from 'dayjs'
// import quarter from 'dayjs/plugin/quarterOfYear'
import utc from 'dayjs/plugin/utc'

// dayjs.extend(quarter)
dayjs.extend(utc)

export default dayjs

export const parseTime = (date?: any, timezone = 0, format?: string) => {
  if (date) {
    let _d = date
    // 秒转毫秒
    if (typeof date === 'number' && String(date).length === 10) _d *= 1000
    // parse date
    const d = dayjs(_d)
    // 合法时间
    if (d.isValid() && d.isAfter('1970-01-01T00:00:01Z')) {
      if (typeof timezone === 'number') {
        return d.utcOffset(timezone * 60).format(format || 'YYYY-MM-DD HH:mm:ss')
      }
      return d.utc().format(format || 'YYYY-MM-DD HH:mm:ss')
    }
  }
  return '--'
}

export const parseUnix = (value: any, utc?: boolean) => {
  if (!value) return ''
  const _d = dayjs(value)
  return _d.isValid() ? _d.utc(utc).unix() : ''
}