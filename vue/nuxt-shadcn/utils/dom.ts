/**
 * 页面滚动
 * @param to 目标元素的id
 * @param behavior 滚动行为
 * @param container 滚动容器
 */
export const pageScroll = (to: string, behavior: 'smooth' | 'instant' = 'smooth', container: string = 'pageContainer') => {
    const wrapper = document.getElementById(container?.replace('#', ''))
    const target = document.getElementById(to.replace('#', ''))
    if (wrapper && target) {
        wrapper.scrollTo({ behavior, top: target.offsetTop - 200 })
    }
}


interface Variant {
    srcset: string
    media?: string
}

enum Size {
    sm = '(max-width: 767px)',
    md = '(min-width: 768px)'
}

export class FileVariantGenerator {
    private basePath: string
    private extension: string
    private currentVariants: Variant[]

    constructor(path: string) {
        this.basePath = path.replace(/\.[^/.]+$/, '')
        this.extension = path.split('.').pop() || ''
        this.currentVariants = [{ srcset: `${this.basePath}.${this.extension}` }]
    }

    withSize(sizes?: Array<keyof typeof Size>): FileVariantGenerator {
        if (!sizes) return this
        this.currentVariants = this.currentVariants.flatMap(variant =>
            sizes.map(s => ({
                srcset: variant.srcset.replace(/\.[^/.]+$/, `@${s}.${this.extension}`),
                media: Size[s]
            }))
        )
        return this
    }

    withLocale(locale?: 'en' | 'zh'): FileVariantGenerator {
        if (!locale || locale === 'en') return this
        this.currentVariants = this.currentVariants.map(variant => ({
            ...variant,
            srcset: variant.srcset.replace(/\.[^/.]+$/, `_${locale}.${this.extension}`)
        }))
        return this
    }

    build(): Variant[] {
        return this.currentVariants
    }
}


/**
 * 等待预加载
 * @param links 预加载链接集合
 * @param maxTime 最大等待时间
 */
export const waitPreloads = (
    links: Array<{ src: string, as: string, type: 'preload' | 'prefetch' }>, 
    maxTime: number = 10*1000
): Promise<any> => {
    let MaxTimerId: any
    return Promise.race([
        Promise.all([
            // 等待字体加载完成
            document.fonts.ready.then(() => {
                console.log('[Preload fonts done]')
            }),
            // 预加载链接
            ...links.map(link => {
                const _link = document.createElement('link')
                _link.rel = link.type
                _link.as = link.as
                _link.href = link.src
                const wait = new Promise((resolve) => {
                    _link.addEventListener('load', ()=>{
                        console.log(`[${link.type} success]`, link.src)
                        resolve()
                    })
                    _link.addEventListener('error', ()=>{
                        console.log(`[${link.type} error]`, link.src)
                        resolve()
                    })
                })
                document.head.appendChild(_link)
                return wait
            })
        ]).then(result => {
            // 清除超时定时器
            clearTimeout(MaxTimerId)
            return result
        }),
        // 超时
        new Promise((resolve) => {
            MaxTimerId = setTimeout(() => {
                console.log('[Preload timeout]')
                resolve()
            }, maxTime)
        })
    ])
}