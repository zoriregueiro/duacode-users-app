"use client"

import { useParams, useRouter } from "next/navigation"
import { useUser } from "@/hooks/useUser"
import { updateUser } from "@/services/users.service"
import { UserForm } from "@/components/users/UserForm"
import { UserFormData } from "@/utils/user.schema"

export default function EditUserPage() {

  const params = useParams()
  const router = useRouter()

  const id = params.id as string

  const { data, isLoading } = useUser(id)

  if (isLoading) return <p>Cargando...</p>

  const handleUpdate = async (formData: UserFormData) => {
    await updateUser(id, formData)
    router.push(`/users/${id}`)
  }

  return (
    <main className="p-10 max-w-md mx-auto">

      <h1 className="text-2xl font-bold mb-6">
        Editar usuario
      </h1>

      <UserForm
        defaultValues={{
          first_name: data?.first_name || "",
          last_name: data?.last_name || "",
          email: data?.email || "",
        }}
        onSubmit={handleUpdate}
      />

    </main>
  )
}