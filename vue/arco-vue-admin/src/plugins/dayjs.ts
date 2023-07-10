import dayjs from 'dayjs'
import quarter from 'dayjs/plugin/quarterOfYear'
import utc from 'dayjs/plugin/utc'

dayjs.extend(quarter)
dayjs.extend(utc)

export default dayjs

export const parseTime = (date?: any) => {
  if (date) {
    const d = dayjs(date)
    if (d.isAfter('1988-01-01T00:00:01Z')) {
      return d.format('YYYY-MM-DD HH:mm:ss')
    }
  }
  return 'N/A'
}
