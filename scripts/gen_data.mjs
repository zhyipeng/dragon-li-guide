import CryptoJS from "crypto-js";
import dotenv from 'dotenv';
import data from '../data.json' assert { type: 'json' }
import {writeFile} from 'fs'


dotenv.config();

// eslint-disable-next-line no-undef
const password = process.env.PASSWORD

console.log('current password: ', password)

const hash = CryptoJS.SHA256(password).toString()
const secretKey = hash
console.log('secretKey: ', secretKey)

function encrypt(text) {
    return CryptoJS.AES.encrypt(text, secretKey).toString();
}

function decrypt(text) {
    return CryptoJS.AES.decrypt(text, secretKey).toString(CryptoJS.enc.Utf8);
}


for (const cate of data) {
    for (const item of cate.items) {
        if (item.encrypt) {
            item.url = encrypt(item.url)
        }
    }
}

const checkStr = "hello world"

const outData = {
    links: data,
    check: {
        origin: checkStr,
        encrypted: encrypt(checkStr)
    }
}

writeFile('src/data.json', JSON.stringify(outData, undefined, 2), (err) => {
    if (err) {
        console.error(err)
    } else {
        console.log('data.json updated')
    }
})
