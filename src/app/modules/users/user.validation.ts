import { z } from "zod";

export const createUserZodSchema = z.object({
  name: z.string({
    message: "Name is required",
  }),
  email: z
    .string({
      message: "Email is required",
    })
    .email("Invalid email format"),
  password: z
    .string({
     message: "Password is required",
    })
    .min(6, "Password must be at least 6 characters"),
  role: z.enum(["admin", "sender", "receiver"], {
    message: "Role is required",
  }),
  isBlocked: z.boolean().optional(),
});


export const updateUserZodSchema = z.object({
  name: z.string().optional(),
  email: z.string().email("Invalid email format").optional(),
  password: z.string().min(6, "Password must be at least 6 characters").optional(),
  role: z.enum(["admin", "sender", "receiver"]).optional(),
  isBlocked: z.boolean().optional(),
});