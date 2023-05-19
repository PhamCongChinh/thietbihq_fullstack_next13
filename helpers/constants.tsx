import { IMessage } from "@/libs/interface"

// Env
export const accessTokenSecret  = process.env.ACCESS_TOKEN_SECRET
export const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET 
export const cryptoSecret       = process.env.CRYPTO_SECRET


// useSWRConfig

export const fetcher = (args: any) => fetch(args).then(res => res.json())


// Message
export const SUCCESS: IMessage = {
    status: "0",
    ecode: "00",
    edesc: "SUCCESS"
}

export const UNSUCCESS: IMessage = {
    status: "1",
    ecode: "01",
    edesc: "UNSUCCESS"
}

export const NOTFOUND: IMessage = {
    status: "1",
    ecode: "09",
    edesc: "NOT FOUND"
}

