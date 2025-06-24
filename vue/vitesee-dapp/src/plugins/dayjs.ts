import dayjs from 'dayjs'
import quarter from 'dayjs/plugin/quarterOfYear'
import utc from 'dayjs/plugin/utc'

dayjs.extend(quarter)
dayjs.extend(utc)

export default dayjs