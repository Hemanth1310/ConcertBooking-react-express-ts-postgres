import {z} from 'zod'

export const registerSchema = z.object({
    firstName: z
        .string()
        .trim()
        .min(2, "First name must be at least 2 characters"),
    
    lastName: z
        .string()
        .trim()
        .min(2, "Last name must be at least 2 characters"),
    email:z.string().email("Invalid email format"),
    password:z.string()
        .min(8,"Please enter at least 8 characters")
        .regex(/[!@#$%^&*]/, "Atleast one special character needed"),
    repassword:z.string(),
}).refine(data=> data.password===data.repassword,{
    message: "Passwords mismatch",
  path: ["repassword"],
})