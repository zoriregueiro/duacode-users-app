import { api } from "@/lib/api"
import { UsersResponse } from "@/types/user.types"
import { addLocalUser, getLocalUsers, updateLocalUser } from "@/utils/localUsers"
import { User } from "@/types/user.types"

let localUsers: any[] = []

export const getUsers = async (page = 1): Promise<UsersResponse> => {

  const { data } = await api.get(`/users?page=${page}`)

  return {
    ...data,
    data: [...localUsers, ...data.data]
  }

}

export const createUser = async (user: {
  first_name: string
  last_name: string
  email: string
  avatar?: string
}) => {

  await api.post("/users", user)

  const newUser = {
    id: Date.now(),
    ...user,
    avatar:
      user.avatar ??
      `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`
  }

  localUsers = [newUser, ...localUsers]

  return newUser
}


export const updateUser = async (
  id: string,
  user: {
    first_name: string
    last_name: string
    email: string
    avatar?: string
  }
) => {

  await api.put(`/users/${id}`, user)

  const updatedUser = {
    id,
    ...user,
    avatar:
      user.avatar ??
      `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`
  }

  localUsers = localUsers.map((u) =>
    u.id === id ? updatedUser : u
  )

  return updatedUser
}

export const deleteUserLocal = (id: number) => {
  localUsers = localUsers.filter((u) => u.id !== id)
}

export const getUsersWithExtra = async () => {

  const [page1, page2] = await Promise.all([
    api.get("/users?page=1"),
    api.get("/users?page=2")
  ])

  return {
    ...page1.data,
    data: [...page1.data.data, ...page2.data.data]
  }

}