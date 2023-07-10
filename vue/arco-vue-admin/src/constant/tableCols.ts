import type { TableColumnData } from '@arco-design/web-vue'
import { parseTime } from '@/plugins/dayjs'

export const calcColWidth = (cols: TableColumnData[], addon?: number) => {
  return cols.reduce((prev, cur) => prev + (cur?.width || 0), 0) + (addon || 0)
}
const CELL_COLOR = { success: '#4ade80', error: '#f76965', warning: '#fb923c' }

const OperateCol: TableColumnData = {
  title: 'Action',
  slotName: 'operate',
  width: 200,
  fixed: 'right'
}
const TimeCol: TableColumnData[] = [
  {
    title: 'UpdatedAt(UTC+0)',
    dataIndex: 'updatedAt',
    width: 200,
    ellipsis: true,
    tooltip: true,
    render({ record }) {
      return parseTime(record?.updatedAt)
    }
  },
  {
    title: 'CreatedAt(UTC+0)',
    dataIndex: 'createdAt',
    width: 200,
    ellipsis: true,
    tooltip: true,
    render({ record }) {
      return parseTime(record?.createdAt)
    }
  }
]

/* System-Admin */

export const colsAdminUser: TableColumnData[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 60
  },
  {
    title: 'Email',
    dataIndex: 'email',
    width: 240,
    ellipsis: true,
    tooltip: true
  },
  {
    title: 'Nickname',
    dataIndex: 'nickname',
    ellipsis: true,
    tooltip: true
  },
  {
    title: 'Status',
    dataIndex: 'enabled',
    render({ record }) {
      return record?.enabled ? 'Enabled' : 'Disabled'
    },
    bodyCellStyle(record: any) {
      return {
        color: record?.enabled ? CELL_COLOR.success : CELL_COLOR.error
      }
    }
  },
  ...TimeCol,
  OperateCol
]
export const colsAdminRole: TableColumnData[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 80
  },
  {
    title: 'Key',
    dataIndex: 'key',
    width: 240,
    ellipsis: true,
    tooltip: true
  },
  {
    title: 'Name',
    dataIndex: 'displayName',
    ellipsis: true,
    tooltip: true
  },
  ...TimeCol,
  OperateCol
]