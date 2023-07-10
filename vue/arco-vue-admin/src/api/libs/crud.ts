import request from '@/plugins/request'

export class CRUD<Schema extends Recordable<any, string>, K = string | number | undefined> {
  protected url: string

  constructor(config: { url: string }) {
    this.url = config.url
  }

  /* Create */
  toAdd(data?: Schema) {
    return request.post(`${this.url}`, data)
  }

  toToggle(id: number, enabled: boolean) {
    return request.post(`${this.url}/${id}/${enabled ? 'enable' : 'disable'}`)
  }

  /* Read */
  toList(params?: any) {
    return request.get<Schema[]>(this.url, params)
  }

  toPage(page: PageType, params?: any) {
    return request.get<{ list: Schema[]; total: number }>(this.url, { ...page, ...params })
  }

  toQuery(key: K, params?: any) {
    return request.get(`${this.url}/${key}`, params)
  }

  /* Update */
  doUpdate(key: K, data: any) {
    return request.patch(`${this.url}/${key}`, data)
  }

  /* Delete */
  toDelete(key: K) {
    return request.delete(`${this.url}/${key}`)
  }
}
