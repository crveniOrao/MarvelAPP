import md5 from 'js-md5'

const publicKey = process.env.VUE_APP_API_PUBLIC_KEY 
const privateKey = process.env.VUE_APP_API_PRIVATE_KEY 
const ts = JSON.stringify(new Date().getTime());
const hash = md5(ts+privateKey+publicKey);


export const url = process.env.VUE_APP_API_URL + 'comics?ts='+ ts +'&apikey='+ publicKey +'&hash='+ hash
