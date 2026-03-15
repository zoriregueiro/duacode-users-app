import { useQuery } from "@tanstack/react-query"
import { getUsers } from "@/services/users.service"
import { getLocalUsers } from "@/utils/localUsers"

const PER_PAGE = 6

export const useUsers = (page: number) => {
  return useQuery({
    queryKey: ["users", page],

    queryFn: async () => {
      // traemos TODAS las páginas de la API
      const page1 = await getUsers(1)
      const page2 = await getUsers(2)

      const apiUsers = [...page1.data, ...page2.data]

      const localUsers = getLocalUsers()

      const allUsers = [...localUsers, ...apiUsers]

      const start = (page - 1) * PER_PAGE
      const end = start + PER_PAGE

      const paginatedUsers = allUsers.slice(start, end)

      const totalPages = Math.ceil(allUsers.length / PER_PAGE)

      return {
        data: paginatedUsers,
        total_pages: totalPages,
        total: allUsers.length,
      }
    },
  })
}
