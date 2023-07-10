/**
 * @description: base64 to blob
 */
export function dataURLtoBlob(base64Buf: string): Blob {
  const arr = base64Buf.split(',')
  const typeItem = arr[0]
  const mime = typeItem.match(/:(.*?);/)![1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr], { type: mime })
}

/**
 * img url to base64
 * @param url
 */
export function urlToBase64(url: string, mineType?: string): Promise<string> {
  return new Promise((resolve) => {
    let canvas = document.createElement('CANVAS') as HTMLCanvasElement
    const ctx = canvas!.getContext('2d')

    const img = new Image()
    img.crossOrigin = ''
    img.addEventListener('load', () => {
      if (!canvas || !ctx) {
        return
      }
      canvas.height = img.height
      canvas.width = img.width
      ctx.drawImage(img, 0, 0)
      const dataURL = canvas.toDataURL(mineType || 'image/png')
      canvas = null!
      resolve(dataURL)
    })
    img.src = url
  })
}

/**
 * file to base64
 * @param file
 */
export function fileToBase64(file: any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.addEventListener('load', () => resolve(reader.result))
    reader.addEventListener('error', (error) => reject(error))
  })
}

export class BS64Code {
  // private property
  static keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
  // public method for encoding
  static encode(input: string) {
    let output = ''
    let chr1: number,
      chr2: number,
      chr3: number,
      enc1: number,
      enc2: number,
      enc3: number,
      enc4: number
    let i = 0
    input = BS64Code._utf8_encode(input)

    const _keyStr = BS64Code.keyStr
    while (i < input.length) {
      chr1 = input.charCodeAt(i++)
      chr2 = input.charCodeAt(i++)
      chr3 = input.charCodeAt(i++)
      enc1 = chr1 >> 2
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4)
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6)
      enc4 = chr3 & 63
      if (Number.isNaN(chr2)) {
        enc3 = enc4 = 64
      } else if (Number.isNaN(chr3)) {
        enc4 = 64
      }
      output =
        output +
        _keyStr.charAt(enc1) +
        _keyStr.charAt(enc2) +
        _keyStr.charAt(enc3) +
        _keyStr.charAt(enc4)
    }
    return output
  }

  // public method for decoding
  static decode(input: string) {
    let output = ''
    let chr1: number, chr2: number, chr3: number
    let enc1: number, enc2: number, enc3: number, enc4: number
    let i = 0
    input = input.replace(/[^\d+/=A-Za-z]/g, '')

    const _keyStr = BS64Code.keyStr
    while (i < input.length) {
      enc1 = _keyStr.indexOf(input.charAt(i++))
      enc2 = _keyStr.indexOf(input.charAt(i++))
      enc3 = _keyStr.indexOf(input.charAt(i++))
      enc4 = _keyStr.indexOf(input.charAt(i++))
      chr1 = (enc1 << 2) | (enc2 >> 4)
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2)
      chr3 = ((enc3 & 3) << 6) | enc4
      output = output + String.fromCharCode(chr1)
      if (enc3 !== 64) {
        output = output + String.fromCharCode(chr2)
      }
      if (enc4 !== 64) {
        output = output + String.fromCharCode(chr3)
      }
    }
    output = BS64Code._utf8_decode(output)
    return output
  }

  // private method for UTF-8 encoding
  static _utf8_encode(string: string) {
    string = string.replace(/\r\n/g, '\n')
    let utftext = ''
    for (let n = 0; n < string.length; n++) {
      const c = string.charCodeAt(n)
      if (c < 128) {
        utftext += String.fromCharCode(c)
      } else if (c > 127 && c < 2048) {
        utftext += String.fromCharCode((c >> 6) | 192)
        utftext += String.fromCharCode((c & 63) | 128)
      } else {
        utftext += String.fromCharCode((c >> 12) | 224)
        utftext += String.fromCharCode(((c >> 6) & 63) | 128)
        utftext += String.fromCharCode((c & 63) | 128)
      }
    }
    return utftext
  }

  // private method for UTF-8 decoding
  static _utf8_decode(utftext: string) {
    let string = ''
    let i = 0
    let [c, c2, c3] = [0, 0, 0]
    while (i < utftext.length) {
      c = utftext.charCodeAt(i)
      if (c < 128) {
        string += String.fromCharCode(c)
        i++
      } else if (c > 191 && c < 224) {
        c2 = utftext.charCodeAt(i + 1)
        string += String.fromCharCode(((c & 31) << 6) | (c2 & 63))
        i += 2
      } else {
        c2 = utftext.charCodeAt(i + 1)
        c3 = utftext.charCodeAt(i + 2)
        string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63))
        i += 3
      }
    }
    return string
  }
}
