export enum FormState {
  create = 1,
  view,
  modify,
  subAct,
  config
}

export const ModalInit: any = {
  titleAlign: 'start',
  okText: 'Submit',
  cancelText: 'Cancel',
  cancelButtonProps: { type: 'text' },
  unmountOnClose: true
}

export const AutoEmailSearch = (v: string) => {
  if (v) {
    return ['outlook.com', 'gmail.com'].map(
      (_) => `${v.split('@')[0]}@${_}`
    )
  } else {
    return []
  }
}
