import { User } from "@/types/user.types"
import { getLocalUsers, getDeletedUsers } from "@/utils/localUsers"
import { useMemo, useState, useEffect } from "react"

export const useMergedUsers = (apiUsers: User[]) => {
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    const handleStorageChange = () => {
      setRefreshKey((prev) => prev + 1)
    }

    window.addEventListener("storage", handleStorageChange)
    window.addEventListener("localStorageChange", handleStorageChange)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener("localStorageChange", handleStorageChange)
    }
  }, [])

  return useMemo(() => {
    const localUsers = getLocalUsers()
    const deletedUsers = getDeletedUsers()

    return [
      ...localUsers,
      ...apiUsers
        .filter(
          (apiUser) =>
            !localUsers.some((localUser) => localUser.id === apiUser.id),
        )
        .filter((apiUser) => !deletedUsers.includes(apiUser.id)),
    ]
  }, [apiUsers, refreshKey])
}
