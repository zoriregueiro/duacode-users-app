import { useQuery } from "@tanstack/react-query"
import { getUsers } from "@/services/users.service"

export const useUsers = (page: number) => {
  return useQuery({
    queryKey: ["users", page],
    queryFn: () => getUsers(page),
  })
}