import { User } from "@/types/user.types"
import { useMemo } from "react"
import { UserCard } from "./UsersCard"

interface Props {
  users: User[]
}

export const UserList = ({ users }: Props) => {

  const sortedUsers = useMemo(() => {
    return [...users].sort((a, b) =>
      a.first_name.localeCompare(b.first_name)
    )
  }, [users])

  return (
    <div className="grid grid-cols-3 gap-6">
      {sortedUsers.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  )
}