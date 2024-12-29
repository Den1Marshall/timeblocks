import { z } from 'zod';

export const zodSchema = z.object({
  email: z.string({ required_error: 'Email is required' }).email(),
  password: z
    .string({ required_error: 'Password is required' })
    .max(4096, { message: 'Must be 4096 or fewer characters long' }),
  isConfirmed: z.boolean().refine((isConfirmed) => isConfirmed === true, {
    message: 'Confirmation is required',
  }),
});

export const googleZodSchema = z.object({
  isConfirmed: z.boolean().refine((isConfirmed) => isConfirmed === true, {
    message: 'Confirmation is required',
  }),
});
