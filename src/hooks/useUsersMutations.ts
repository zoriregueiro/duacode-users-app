import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteUser, updateUser } from "@/services/users.service"
import { toast } from "sonner"
import { createUser } from "@/services/users.service"

export const useCreateUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createUser,

    onSuccess: (newUser) => {
      queryClient.setQueryData(["users"], (old: any) => {
        if (!old) return old

        return {
          ...old,
          data: [newUser, ...old.data],
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
      queryClient.setQueryData(["users"], (old: any) => {
        if (!old) return old

        return {
          ...old,
          data: old.data.map((user: any) =>
            user.id === updatedUser.id ? updatedUser : user,
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
    mutationFn: deleteUser,

    onSuccess: (deletedId) => {
      queryClient.setQueryData(["users"], (old: any) => {
        if (!old) return old

        return {
          ...old,
          data: old.data.filter((user: any) => user.id !== deletedId),
        }
      })

      toast.success("Usuario eliminado")
    },
  })
}
