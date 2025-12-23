import {z} from 'zod'

export const userCoreSchema = z.object({
    firstName: z.string().trim().min(2, "First name must be at least 2 characters"),
    lastName: z.string().trim().min(2, "Last name must be at least 2 characters"),
    email: z.string().email("Invalid email format").trim().toLowerCase(),
});

export const updateProfileSchema = userCoreSchema.partial()