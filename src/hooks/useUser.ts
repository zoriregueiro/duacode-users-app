import { useQuery } from "@tanstack/react-query"
import { api } from "@/lib/api"
import { User } from "@/types/user.types"

export const useUser = (id: string) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: async () => {
      const { data } = await api.get(`/users/${id}`)
      return data.data as User
    },
  })
}