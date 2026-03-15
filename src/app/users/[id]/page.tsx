"use client"

import { useParams } from "next/navigation"
import { useUser } from "@/hooks/useUser"
import { UserDetail } from "@/components/users/UserDetail"

export default function UserPage() {

  const params = useParams()
  const id = params.id as string

  const { data, isLoading, error } = useUser(id)

  if (isLoading) return <p>Cargando usuario...</p>

  if (error) return <p>Error cargando usuario</p>

  if (!data) return null

  return (
    <main className="p-10 max-w-md mx-auto">

      <h1 className="text-3xl font-bold mb-6">
        Detalle de usuario
      </h1>

      <UserDetail user={data} />

    </main>
  )
}