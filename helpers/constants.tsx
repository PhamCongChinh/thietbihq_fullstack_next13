export const SUCCESS    = 'SUCCESS'
export const UNSUCCESS  = 'UNSUCCESS'
export const NOTFOUND   = 'NOT FOUND'



// Env
export const accessTokenSecret  = process.env.ACCESS_TOKEN_SECRET
export const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET 
export const cryptoSecret       = process.env.CRYPTO_SECRET


// useSWRConfig

export const fetcher = (args: any) => fetch(args).then(res => res.json())