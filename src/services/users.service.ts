import { api } from "@/lib/api"
import { UsersResponse } from "@/types/user.types"

export const getUsers = async (): Promise<UsersResponse> => {
  const response = await api.get("/users")
  return response.data
}