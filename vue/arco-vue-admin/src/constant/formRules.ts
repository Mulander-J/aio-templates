// 必填项
export const required = {
  required: true,
  message: 'This filed is required'
}

export const maxLength = (len: number) => ({
  validateTrigger: ['input'],
  maxLength: len,
  message: `Max length ${len}`
})

// 邮箱
export const isEmail = {
  validateTrigger: ['input'],
  match: /^[\w%+.-]+@[\d.A-Za-z-]+\.[A-Za-z]{2,}$/,
  message: 'Please enter a valid Email Address.'
}

// 域名 {network}{body}.{suffix} | {ip:port}
export const isDomain = {
  validateTrigger: ['input'],
  match:
    /(^([\dA-Za-z]([\w-]{0,61}[\dA-Za-z])?\.)+[A-Za-z]{2,11}$)|(^(\d{1,3})(.(\d{1,3})){3}:\d{2,6}$)/,
  message: 'Invalid domain'
}

// // url
// export const linkUrl = {
//   trigger: 'blur',
//   pattern: /(https?|ftp|file):\/\/[\w!#%&+,./:;=?@|~-]+[\w#%&+/=@|~-]/,
//   message: t('error.wrongLink')
// }

// 强密码
export const strongPwd = {
  validateTrigger: ['input'],
  match: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!#$%&*?@])[\d!#$%&*?@A-Za-z]{8,}$/,
  message: '8 digits(0~9 + A~Za~z + $!%&*?#@)'
}

export const isPubKey = {
  validateTrigger: ['input'],
  // match: /^(?!\d+$)(?![A-Za-z]+$)[\dA-Za-z]{2,}$/,
  match: /^(0x)?[0-9a-fA-F]{96}$/,
  message: 'Invalid pubkey'
}

export const isHex = {
  validateTrigger: ['blur'],
  match: /^0x.*/,
  message: 'Please enter a 0x address.'
}

export const isEvmAddr = {
  validateTrigger: ['input'],
  match: /^0x[\dA-Fa-f]{40}$/,
  message: 'Invalid EVM address'
}