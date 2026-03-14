"use client"

import { useState } from "react"
import { useUsers } from "@/hooks/useUsers"
import { UserList } from "@/components/users/UserList"
import Link from "next/link"
import { Skeleton } from "@/components/ui/skeleton"

export default function Home() {

  const [page, setPage] = useState(1)

  const { data, isLoading, error } = useUsers(page)

  if (isLoading) return <p>Cargando usuarios...</p>

  if (error) return <p>Error cargando usuarios</p>

  if (isLoading) {
  return (
    <div className="grid grid-cols-3 gap-6 p-10">
      {Array.from({ length: 6 }).map((_, i) => (
        <Skeleton key={i} />
      ))}
    </div>
  )
}

  return (
    <main className="p-10">

      <div className="flex justify-between items-center mb-6">

        

        <h1 className="text-3xl font-bold">
          Lista de usuarios
        </h1>

        <Link
          href="/users/create"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Crear usuario
        </Link>

      </div>

      <UserList users={data?.data || []} />

      <div className="flex gap-4 mt-8">

        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          className="px-4 py-2 border rounded"
        >
          Anterior
        </button>

        <span>Página {page}</span>

        <button
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 border rounded"
        >
          Siguiente
        </button>

      </div>

    </main>
  )
}