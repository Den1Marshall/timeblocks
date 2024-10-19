import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().email().min(1, { message: 'Email is required' }),
  password: z
    .string()
    .min(1, { message: 'Password is required' })
    .min(6, { message: 'Must be 6 or more characters long' })
    .max(4096, { message: 'Must be 4096 or fewer characters long' })
    .regex(/\d/, { message: 'Must contain at least one numeric character' })
    .regex(/(?=.*[a-z])/, {
      message: 'Must contain at least one lowercase character',
    })
    .regex(/(?=.*[A-Z])/, {
      message: 'Must contain at least one uppercase character',
    }),
});

export const loginSchema = z.object({
  email: z.string().email().min(1, { message: 'Email is required' }),
  password: z
    .string()
    .min(1, { message: 'Password is required' })
    .max(4096, { message: 'Must be 4096 or fewer characters long' }),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email(),
});