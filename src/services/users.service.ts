import { api } from "@/lib/api"
import { UsersResponse } from "@/types/user.types"

export const getUsers = async (page = 1): Promise<UsersResponse> => {
  const { data } = await api.get(`/users?page=${page}`)
  return data
}

export const createUser = async (user: {
  first_name: string
  last_name: string
  email: string
}) => {
  const { data } = await api.post("/users", user)
  return data
}

export const updateUser = async (
  id: string,
  user: {
    first_name: string
    last_name: string
    email: string
  }
) => {
  const { data } = await api.put(`/users/${id}`, user)
  return data
}