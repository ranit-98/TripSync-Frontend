import { z } from 'zod';

const emailSchema = z
  .string()
  .trim()
  .min(1, 'Email address is required')
  .email('Enter a valid email address')
  .transform((email) => email.toLowerCase());

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
});

export const registrationSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Full name is required')
    .min(2, 'Full name must be at least 2 characters')
    .max(80, 'Full name must be 80 characters or less'),
  email: emailSchema,
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters'),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegistrationFormValues = z.infer<typeof registrationSchema>;
