"use client"

import { motion } from "framer-motion"
import { UserForm } from "./UserForm"
import { X } from "lucide-react"
import { useEffect } from "react"
import { useEscapeKey } from "@/hooks/useScapeKey"
import { User } from "@/types/user.types"
import { UserFormData } from "@/utils/user.schema"

interface Props {
  open: boolean
  onClose: () => void
  onCreate: (data: UserFormData) => void
}

export const CreateUserModal = ({ open, onClose, onCreate }: Props) => {
  useEscapeKey(onClose)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    window.addEventListener("keydown", handler)

    return () => window.removeEventListener("keydown", handler)
  }, [])

  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="
        w-[520px]
        bg-[#111827]
        border border-gray-800
        rounded-xl
        p-6
        shadow-xl
        "
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Crear nuevo usuario</h2>

          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={18} />
          </button>
        </div>

        <UserForm onSubmit={onCreate} />
      </motion.div>
    </div>
  )
}
