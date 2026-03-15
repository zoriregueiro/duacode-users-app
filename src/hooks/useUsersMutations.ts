import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateUser } from "@/services/users.service"
import { api } from "@/lib/api"
import { toast } from "sonner"
import { createUser } from "@/services/users.service"
import { deleteLocalUser } from "@/utils/localUsers"

export const useCreateUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createUser,

    onSuccess: (newUser) => {
      queryClient.setQueryData(["users", 1], (old: any) => {
        if (!old) return old

        return {
          ...old,
          data: [newUser, ...(old.data ?? [])],
        }
      })

      toast.success("Usuario creado")
    },
  })
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: any) => updateUser(id, data),

    onSuccess: (updatedUser) => {
      queryClient.setQueryData(["users", 1], (old: any) => {
        if (!old) return old

        return {
          ...old,
          data: old.data.map((u: any) =>
            u.id === updatedUser.id ? updatedUser : u,
          ),
        }
      })

      toast.success("Usuario actualizado")
    },

    onError: () => {
      toast.error("Error al actualizar usuario")
    },
  })
}

export const useDeleteUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => api.delete(`/users/${id}`),

    onMutate: async (id) => {
      await queryClient.cancelQueries({
        queryKey: ["users"],
      })

      const previous = queryClient.getQueryData(["users", 1])

      queryClient.setQueryData(["users", 1], (old: any) => {
        if (!old) return old

        return {
          ...old,
          data: old.data.filter((u: any) => u.id !== id),
        }
      })

      return { previous }
    },

    onError: (_, __, context) => {
      queryClient.setQueryData(["users", 1], context?.previous)

      toast.error("No se pudo eliminar el usuario")
    },

    onSuccess: (_, id) => {
      deleteLocalUser(id)

      toast.success("Usuario eliminado")
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      })
    },
  })
}
