import { User } from "@/types/user.types"
import { UserCard } from "./UsersCard"

interface Props {
  users: User[]
  onSelect: (user: User) => void
}

export const UserList = ({ users, onSelect }: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">

      {users.map((user) => (
        <UserCard
          key={user.id}
          user={user}
          onClick={() => onSelect(user)}
        />
      ))}

    </div>
  )
}