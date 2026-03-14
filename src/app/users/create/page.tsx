"use client"

import { useRouter } from "next/navigation"
import { createUser } from "@/services/users.service"
import { UserForm } from "@/components/users/UserForm"
import { UserFormData } from "@/utils/user.schema"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export default function CreateUserPage() {

  const router = useRouter()
  const queryClient = useQueryClient()

  const mutation = useMutation({
  mutationFn: createUser,

  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["users"] })
    router.push("/")
  },
})

const handleCreate = (data: UserFormData) => {
  mutation.mutate(data)
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