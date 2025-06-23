export enum ErrCode {
  Err_A = 1000001,
  Err_B = 1000003,
  Err_C = 1000005,
}

export const ErrCodeReplace = (data: {
  code?: number
  msg?: string
}): Nullable<{
  code?: number
  msg?: string
  _global?: boolean // 是否全局toast报错，默认为真
}> => {
  const code = data?.code

  if (!code) return null

  switch (code) {
    case ErrCode.Err_A:
      return { code, msg: 'Error Message A.' }
    case ErrCode.Err_B:
      return { code, msg: 'Error Message B.' }
    case ErrCode.Err_C:
      data.msg = 'Error Message C.'
    // eslint-disable-next-line no-fallthrough
    default:
      return { ...data, _global: true }
  }
}

export const setFormWithErr = (
  data: { code?: number; msg?: string },
  form: any,
  strategy: 'caseA' | 'caseB'
) => {
  let [key, message, status] = ['', data?.msg, 'error']

  switch (strategy) {
    case 'caseA':
      switch (data?.code) {
        case ErrCode.Err_A:
          key = 'field_a'
          break
      }
      break
    case 'caseB':
      switch (data?.code) {
        case ErrCode.Err_B:
          key = 'field_b'
          break
      }
      break
  }

  form.setFields({ [key]: { status, message } })
}
