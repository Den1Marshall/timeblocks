import { z, ZodSchema } from 'zod';

export const zodSchema: ZodSchema = z.object({
  newEmail: z.string({ required_error: 'New email is required' }).email(),
  password: z
    .string({ required_error: 'Password is required' })
    .max(4096, { message: 'Must be 4096 or fewer characters long' }),
});
