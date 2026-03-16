"use client"

import { motion } from "framer-motion"
import { User } from "@/types/user.types"
import { UserForm } from "@/components/users/UserForm"
import { useEscapeKey } from "@/hooks/useScapeKey"
import { Users } from "lucide-react"
import { useState } from "react"
import { ConfirmModal } from "../ui/ConfirmModal"

interface Props {
  user: User | null
  mode: "view" | "edit"
  onEdit: () => void
  onClose: () => void
  onSave: (data: any) => void
  onDelete: (id: number) => void
}

export const UserDrawer = ({
  user,
  mode,
  onEdit,
  onClose,
  onSave,
  onDelete,
}: Props) => {
  useEscapeKey(onClose)
  const [confirmOpen, setConfirmOpen] = useState(false)

  if (!user) return null

  return (
    <motion.div
      initial={{ x: 420 }}
      animate={{ x: 0 }}
      exit={{ x: 420 }}
      transition={{ duration: 0.25 }}
      // className="
      // fixed right-0 top-0 h-full w-[420px]
      // bg-[#111827]
      // border-l border-gray-800
      // p-6
      // z-50
      // flex flex-col
      // "
      className="
fixed right-0 top-0 h-full
w-full sm:w-[420px]
bg-[#111827]
border-l border-gray-800
p-6
z-50
flex flex-col
"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-semibold text-lg">
          {mode === "view" ? "Detalle del usuario" : "Editar usuario"}
        </h2>

        <button onClick={onClose}>✕</button>
      </div>

      {mode === "view" && (
        <>
          <div className="text-center">
            {user.avatar ? (
              <img
                src={user.avatar}
                className="w-24 h-24 rounded-full mx-auto border-4 border-green-500"
              />
            ) : (
              <div className="w-24 h-24 rounded-full mx-auto border-4 border-green-500 flex justify-center items-center">
                <Users size={24} className="text-gray-400" />
              </div>
            )}

            <h3 className="mt-4 font-semibold text-lg">
              {user.first_name} {user.last_name}
            </h3>

            <p className="text-green-400 text-sm">Developer</p>
          </div>

          <div className="mt-8 space-y-4 text-sm">
            <div className="bg-gray-800/40 p-3 rounded-lg">
              <p className="text-xs text-gray-500">Email</p>
              <p>{user.email}</p>
            </div>

            <div className="bg-gray-800/40 p-3 rounded-lg">
              <p className="text-xs text-gray-500">Departamento</p>
              <p>Engineering</p>
            </div>

            <div className="bg-gray-800/40 p-3 rounded-lg">
              <p className="text-xs text-gray-500">Rol</p>
              <p>Developer</p>
            </div>
          </div>

          <div className="mt-auto pt-6 flex gap-3">
            <button
              onClick={onEdit}
              className="flex-1 bg-green-500 hover:bg-green-600 text-black font-medium py-1 rounded"
            >
              Editar
            </button>

            <button
              onClick={() => setConfirmOpen(true)}
              className="flex-1 border border-red-500 text-red-500 py-1 rounded"
            >
              Eliminar
            </button>
          </div>
        </>
      )}

      {mode === "edit" && (
        <UserForm defaultValues={user} onSubmit={(data) => onSave(data)} />
      )}

      <ConfirmModal
        open={confirmOpen}
        title="Eliminar usuario"
        description="Esta acción no se puede deshacer."
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => {
          onDelete(user.id)
          setConfirmOpen(false)
        }}
      />
    </motion.div>
  )
}
