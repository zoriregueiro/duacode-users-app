import { User } from "@/types/user.types"

const STORAGE_KEY = "custom_users"


export const getLocalUsers = (): User[] => {

  if (typeof window === "undefined") return []

  const data = localStorage.getItem(STORAGE_KEY)

  return data ? JSON.parse(data) : []

}


export const saveLocalUsers = (users: User[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users))
}


export const addLocalUser = (user: User) => {

  const users = getLocalUsers()

  const updated = [user, ...users]

  saveLocalUsers(updated)

}


export const updateLocalUser = (updatedUser: User) => {

  const users = getLocalUsers()

  const updated = users.map((u: User) =>
    u.id === updatedUser.id ? updatedUser : u
  )

  saveLocalUsers(updated)

}


export const deleteLocalUser = (id: number) => {

  const users = getLocalUsers()

  const updated = users.filter((u: User) => u.id !== id)

  saveLocalUsers(updated)

}