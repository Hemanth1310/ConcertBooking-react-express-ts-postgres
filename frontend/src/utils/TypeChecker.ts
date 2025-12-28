import { z } from 'zod';

// 1. CORE RULES (The building blocks)
export const userCoreSchema = z.object({
    firstName: z.string().trim().min(2, "First name must be at least 2 characters"),
    lastName: z.string().trim().min(2, "Last name must be at least 2 characters"),
    email: z.string().email("Invalid email format").trim().toLowerCase(),
});

// Define password rules ONCE so they are identical everywhere
const passwordRules = z.string()
    .min(8, "Please enter at least 8 characters")
    .regex(/[!@#$%^&*]/, "At least one special character needed");


// 2. REGISTRATION SCHEMA (Core + Password + Match Check)
export const registerSchema = userCoreSchema.extend({
    password: passwordRules,
    repassword: z.string(),
}).refine(data => data.password === data.repassword, {
    message: "Passwords mismatch",
    path: ["repassword"],
});


// 3. RESET PASSWORD SCHEMA (Just Password + Match Check)
export const resetPasswordSchema = z.object({
    password: passwordRules,
    repassword: z.string(),
}).refine(data => data.password === data.repassword, {
    message: "Passwords do not match",
    path: ["repassword"],
});


// 4. PROFILE UPDATE SCHEMA (Everything is optional)
export const updateProfileSchema = userCoreSchema.partial();


// 5. TYPES (Extracted from the schemas)
export type RegistrationInput = z.infer<typeof registerSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
export type UpdatedProfileInput = z.infer<typeof updateProfileSchema>;