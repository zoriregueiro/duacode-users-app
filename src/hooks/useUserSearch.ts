import { useMemo } from "react"
import { User } from "@/types/user.types"

export const useUserSearch = (users: User[], search: string) => {
  return useMemo(() => {
    if (!search) return users

    const term = search.toLowerCase()

    return users.filter(
      (user) =>
        user.first_name.toLowerCase().includes(term) ||
        user.last_name.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term),
    )
  }, [users, search])
}
