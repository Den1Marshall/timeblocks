import { z } from 'zod';

export const zodSchema = z.object({
  email: z.string({ required_error: 'Email is required' }).email(),
});
