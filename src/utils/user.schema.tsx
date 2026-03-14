import { z } from "zod"

export const userSchema = z.object({
  first_name: z.string().min(2, "Nombre requerido"),
  last_name: z.string().min(2, "Apellido requerido"),
  email: z.string().email("Email inválido"),
})

export type UserFormData = z.infer<typeof userSchema>