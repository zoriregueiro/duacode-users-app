import { getUsersWithExtra } from "@/services/users.service"
import { useQuery } from "@tanstack/react-query"

export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: getUsersWithExtra,
  })
}
