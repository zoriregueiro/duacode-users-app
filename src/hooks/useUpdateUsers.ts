import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateUser } from "@/services/users.service"

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
            u.id === updatedUser.id ? updatedUser : u
          ),
        }
      })
    },
  })
}

