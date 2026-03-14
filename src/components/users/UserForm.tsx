"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { userSchema, UserFormData } from "@/utils/user.schema"
import { useEffect, useState } from "react"

interface Props {
  defaultValues?: UserFormData
  onSubmit: (data: UserFormData) => void
}

export const UserForm = ({ defaultValues, onSubmit }: Props) => {

  const [preview, setPreview] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues,
  })

useEffect(() => {

  if (defaultValues?.avatar) {
    setPreview(defaultValues.avatar)
  }
}, [defaultValues])

 const handleImageChange = (file: any) => {
  setValue("avatar", file)
  setPreview(URL.createObjectURL(file))
}

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4"
    >
<div className="flex flex-col items-center gap-3">

<div className="flex justify-center">

  <label className="relative cursor-pointer group">

    {preview ? (
      <img
        src={preview}
        alt="avatar"
        className="w-24 h-24 rounded-full object-cover border-4 border-green-500"
      />
    ) : (
      <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center text-white">
        Avatar
      </div>
    )}

  
    <div className="
      absolute inset-0
      rounded-full
      bg-black/50
      flex items-center justify-center
      opacity-0
      group-hover:opacity-100
      transition
    ">
      <span className="text-xs text-white">
        Cambiar
      </span>
    </div>

    <input
      type="file"
      accept="image/*"
      className="hidden"
      onChange={(e) => {
        if (e.target.files?.[0]) {
          handleImageChange(e.target.files[0])
        }
      }}
    />

  </label>

</div>

</div>
      <input
        {...register("first_name")}
        placeholder="Nombre"
        className="border rounded px-4 py-2 text-gray-700 focus:ring-2 focus:ring-green-500"
      />

      {errors.first_name && (
        <p className="text-red-500 text-sm">
          {errors.first_name.message}
        </p>
      )}

  

      <input
        {...register("last_name")}
        placeholder="Apellido"
        className="border rounded px-4 py-2 text-gray-700 focus:ring-2 focus:ring-green-500"
      />

      {errors.last_name && (
        <p className="text-red-500 text-sm">
          {errors.last_name.message}
        </p>
      )}



      <input
        {...register("email")}
        placeholder="Email"
        className="border rounded px-4 py-2 text-gray-700 focus:ring-2 focus:ring-green-500"
      />

      {errors.email && (
        <p className="text-red-500 text-sm">
          {errors.email.message}
        </p>
      )}

      <button
        type="submit"
        className="bg-green-500 hover:bg-green-600 text-white p-2 rounded"
      >
        Guardar usuario
      </button>

    </form>
  )
}