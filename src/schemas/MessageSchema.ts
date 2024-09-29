import {z} from 'zod'

export const MessageSchema=z.object({
    content:z.string()
    .min(5,{message:"content must be more then 5 charecters"})
    .max(100,{message:"content must not be more then 100 charecters"})
})