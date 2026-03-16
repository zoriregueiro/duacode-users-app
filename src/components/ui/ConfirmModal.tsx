"use client"

import { motion } from "framer-motion"

interface Props {
  open: boolean
  title?: string
  description?: string
  onConfirm: () => void
  onCancel: () => void
}

export const ConfirmModal = ({
  open,
  title = "Confirmar acción",
  description = "¿Estás seguro de que quieres continuar?",
  onConfirm,
  onCancel,
}: Props) => {
  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-[#111827] border border-gray-700 rounded-lg p-6 w-[360px]"
      >
        <h3 className="text-lg font-semibold mb-2">{title}</h3>

        <p className="text-sm text-gray-400 mb-6">{description}</p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-gray-600 rounded text-gray-300 hover:bg-gray-700"
          >
            Cancelar
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
          >
            Eliminar
          </button>
        </div>
      </motion.div>
    </div>
  )
}
