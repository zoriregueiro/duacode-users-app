"use client"
import Link from "next/link"
import { useUsers } from "@/hooks/useUsers"
import { UserList } from "@/components/users/UserList"

export default function Home() {
  const { data, isLoading, error } = useUsers()

  if (isLoading) return <p>Cargando usuarios...</p>

  if (error) return <p>Error cargando usuarios</p>

  return (
    <main className="p-10">

      <h1 className="text-3xl font-bold mb-6">
        Lista de usuarios
      </h1>
      <Link href="/users/create" className="bg-green-600 text-white px-4 py-2 rounded"> Crear usuario </Link>

      <UserList users={data?.data || []} />

    </main>
  )
}