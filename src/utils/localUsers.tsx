import { User } from "@/types/user.types"

const STORAGE_KEY = "local_users"

const DELETED_KEY = "deleted_users"

export const getLocalUsers = (): User[] => {
  if (typeof window === "undefined") return []

  const stored = localStorage.getItem(STORAGE_KEY)

  return stored ? JSON.parse(stored) : []
}

export const saveLocalUsers = (users: User[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users))
  window.dispatchEvent(new Event("localStorageChange"))
}

export const addLocalUser = (user: User) => {
  const users = getLocalUsers()

  const updated = [user, ...users]

  saveLocalUsers(updated)
}

export const getDeletedUsers = (): number[] => {
  if (typeof window === "undefined") return []

  const stored = localStorage.getItem(DELETED_KEY)
  return stored ? JSON.parse(stored) : []
}

export const addDeletedUser = (id: number) => {
  const deleted = getDeletedUsers()

  const updated = [...deleted, id]

  localStorage.setItem(DELETED_KEY, JSON.stringify(updated))
  window.dispatchEvent(new Event("localStorageChange"))
}

export const removeLocalUser = (id: number) => {
  const users = getLocalUsers()

  const updated = users.filter((u) => u.id !== id)

  saveLocalUsers(updated)
}

export const updateLocalUser = (updatedUser: User) => {
  const users = getLocalUsers()

  const updated = users.map((u) => (u.id === updatedUser.id ? updatedUser : u))

  saveLocalUsers(updated)
}

export const deleteLocalUser = (id: number) => {
  const users = getLocalUsers()

  const updated = users.filter((u) => u.id !== id)

  saveLocalUsers(updated)
}
