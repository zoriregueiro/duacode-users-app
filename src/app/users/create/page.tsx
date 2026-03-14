"use client"

import { useRouter } from "next/navigation"
import { createUser } from "@/services/users.service"
import { UserForm } from "@/components/users/UserForm"
import { UserFormData } from "@/utils/user.schema"

export default function CreateUserPage() {

  const router = useRouter()

  const handleCreate = async (data: UserFormData) => {
    await createUser(data)
    router.push("/")
  }

  return (
    <main className="p-10 max-w-md mx-auto">

      <h1 className="text-2xl font-bold mb-6">
        Crear usuario
      </h1>

      <UserForm onSubmit={handleCreate} />

    </main>
  )
}