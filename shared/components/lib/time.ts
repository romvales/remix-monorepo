import dayjs from 'dayjs'

import localeData from 'dayjs/plugin/localeData'
import relativeTime from 'dayjs/plugin/relativeTime'
import utc from 'dayjs/plugin/utc'

dayjs.extend(localeData)
dayjs.extend(relativeTime)
dayjs.extend(utc)

export default dayjs