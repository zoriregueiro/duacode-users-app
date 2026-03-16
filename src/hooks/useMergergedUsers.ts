import { User } from "@/types/user.types"
import { getLocalUsers, getDeletedUsers } from "@/utils/localUsers"
import { useMemo } from "react"

export const useMergedUsers = (apiUsers: User[]) => {
  const localUsers = getLocalUsers()
  const deletedUsers = getDeletedUsers()

  return useMemo(() => {
    return [
      ...localUsers,
      ...apiUsers
        .filter(
          (apiUser) =>
            !localUsers.some((localUser) => localUser.id === apiUser.id),
        )
        .filter((apiUser) => !deletedUsers.includes(apiUser.id)),
    ]
  }, [apiUsers])
}
