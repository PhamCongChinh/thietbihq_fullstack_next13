var CryptoJS = require('crypto-js')

const encrypt = (text: string, secret: string) => {
    const ciphertext = CryptoJS.AES.encrypt(text, secret).toString()
    return ciphertext
}

const decrypt = (ciphertext: string, secret: string) => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, secret)
    const originalText = bytes.toString(CryptoJS.enc.Utf8)
    return originalText
}
export {
    encrypt,
    decrypt
}