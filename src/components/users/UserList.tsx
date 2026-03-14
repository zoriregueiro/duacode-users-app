import { User } from "@/types/user.types"
import { useMemo } from "react"
import { UserCard } from "./UsersCard"

interface Props {
  users: User[]
}

export const UserList = ({ users }: Props) => {

  const memoizedUsers = useMemo(() => {
    return users
  }, [users])

  return (
    <div className="grid grid-cols-3 gap-6">
      {memoizedUsers.map((user) => (
        <UserCard
          key={user.id}
          user={user}
        />
      ))}
    </div>
  )
}