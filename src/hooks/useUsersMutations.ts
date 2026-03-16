import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteUser, updateUser } from "@/services/users.service"
import { toast } from "sonner"
import { createUser } from "@/services/users.service"
import { updateResponse, User, UsersResponse } from "@/types/user.types"

type UpdateUserMutation = {
  id: number
  data: updateResponse
}

export const useCreateUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createUser,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
      toast.success("Usuario creado")
    },
  })
}
export const useUpdateUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: UpdateUserMutation) => updateUser(id, data),

    onSuccess: (updatedUser) => {
      queryClient.setQueryData(["users"], (old: UsersResponse | undefined) => {
        if (!old) return old

        return {
          ...old,
          data: old.data.map((user) =>
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

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
      toast.success("Usuario eliminado")
    },
  })
}
