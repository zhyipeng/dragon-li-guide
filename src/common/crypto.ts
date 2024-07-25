import {AES, SHA256, enc} from 'crypto-js'
import {check} from '../data.json'

export default class Crypto {
    key: string = ''

    constructor(opt: {pwd?: string, key?: string}) {
        if (opt.key) {
            this.key = opt.key
        } else if (opt.pwd) {
            if (!this.checkPwd(opt.pwd)) {
                throw new Error('密码错误')
            }
        } else {
            throw new Error('密码错误')
        }
    }

    private checkPwd(pwd: string): boolean {
        const key = this.genKey(pwd)
        console.log(key)
        try {
            const result = this.decrypt(check.encrypted, key)
            if (result !== check.origin) {
                return false
            }
        } catch(e) {
            console.error(e)
            return false
        }
        this.key = key
        return true
    }

    private genKey(pwd: string): string {
        return SHA256(pwd).toString()
    }

    decrypt(data: string, key?: string): string {
        return AES.decrypt(data, key || this.key).toString(enc.Utf8)
    }
}

