"use client"
import { User } from "@/types/user.types"
import { useRouter } from "next/navigation"

interface Props {
  user: User | null
  onClose: () => void
}

export const UserDrawer = ({ user, onClose }: Props) => {

    const router = useRouter()

  if (!user) return null

  return (
 <div
  className={`
    fixed right-0 top-0 h-full w-[420px]
    bg-[#111827]
    border-l border-gray-800
    p-6
    transform transition-transform duration-300
    z-50
    ${user ? "translate-x-0" : "translate-x-full"}
  `}
>

      <div className="flex justify-between mb-6">
        <h2 className="font-semibold">Detalle del usuario</h2>
        <button onClick={onClose}>✕</button>
      </div>

      <div className="text-center">

    <img
  src={user.avatar}
  className="w-24 h-24 rounded-full mx-auto border-4 border-green-500"
/>

        <h3 className="mt-4 font-semibold text-lg">
          {user.first_name} {user.last_name}
        </h3>

        <p className="text-green-400">
          Developer
        </p>

      </div>

      <div className="mt-6 space-y-3 text-sm text-gray-400">

        <p>Email: {user.email}</p>
        <p>Departamento: Engineering</p>
        <p>Rol: Developer</p>

      </div>

      <div className="w-100 flex justify-end">

      <button
  onClick={(e) => {
    e.stopPropagation()
    onClose()
    router.push(`/users/edit/${user.id}`)
  }}
  className="text-sm bg-green-500 hover:bg-green-600 px-3 py-2 rounded-md"
>
  Editar
</button>
      </div>
    </div>
  )
}