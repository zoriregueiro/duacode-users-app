import { api } from "@/lib/api"
import { User, UsersResponse } from "@/types/user.types"
import {
  addLocalUser,
  updateLocalUser,
  deleteLocalUser,
  addDeletedUser,
} from "@/utils/localUsers"
import { v4 as uuid } from "uuid"

type CreateUserInput = {
  first_name: string
  last_name: string
  email: string
  avatar?: string
}

export const getUsers = async (page = 1): Promise<UsersResponse> => {
  const { data } = await api.get(`/users?page=${page}`)
  return data
}

export const createUser = async (user: CreateUserInput) => {
  await api.post("/users", user)

  const newUser = {
    id: +uuid(),
    ...user,
    avatar:
      user.avatar ??
      `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
  }

  addLocalUser(newUser)

  return newUser
}

export const updateUser = async (
  id: number,
  user: {
    first_name: string
    last_name: string
    email: string
    avatar?: string
  },
) => {
  try {
    await api.put(`/users/${id}`, user)
  } catch {}

  const updatedUser: User = {
    id,
    ...user,
    avatar:
      user.avatar ??
      `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
  }

  updateLocalUser(updatedUser)

  return updatedUser
}

export const deleteUser = async (id: number) => {
  try {
    await api.delete(`/users/${id}`)
  } catch {}

  addDeletedUser(id)
  deleteLocalUser(id)

  return id
}

export const getUsersWithExtra = async () => {
  const [page1, page2] = await Promise.all([
    api.get("/users?page=1"),
    api.get("/users?page=2"),
  ])

  return {
    ...page1.data,
    data: [...page1.data.data, ...page2.data.data],
  }
}
