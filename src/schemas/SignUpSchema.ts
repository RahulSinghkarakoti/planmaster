import { z } from 'zod'

export const usernameValidation= z
.string()
.min(2,"username must be atleast  2 charecters")
.max(20,"username must not be more then 20 charecter")

export const SignUpSchema = z.object({
    username: usernameValidation,
    password: z.string().min(6, { message: "password must be atleast 6 charecters" }),
    email: z.string().email({ message: "invalid email address " }),
})