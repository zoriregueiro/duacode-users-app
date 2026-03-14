"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { userSchema, UserFormData } from "@/utils/user.schema"

interface Props {
  defaultValues?: UserFormData
  onSubmit: (data: UserFormData) => void
}

export const UserForm = ({ defaultValues, onSubmit }: Props) => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues,
  })

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4"
    >
      <input
        {...register("first_name")}
        placeholder="Nombre"
        className="border p-2 rounded"
      />
      {errors.first_name && (
        <p className="text-red-500 text-sm">
          {errors.first_name.message}
        </p>
      )}

      <input
        {...register("last_name")}
        placeholder="Apellido"
        className="border p-2 rounded"
      />
      {errors.last_name && (
        <p className="text-red-500 text-sm">
          {errors.last_name.message}
        </p>
      )}

      <input
        {...register("email")}
        placeholder="Email"
        className="border p-2 rounded"
      />
      {errors.email && (
        <p className="text-red-500 text-sm">
          {errors.email.message}
        </p>
      )}

      <button
        type="submit"
        className="bg-blue-600 text-white p-2 rounded"
      >
        Guardar usuario
      </button>
    </form>
  )
}