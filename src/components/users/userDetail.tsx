import { User } from "@/types/user.types"
import { Avatar } from "../ui/Avatar"
import { Card } from "../ui/Card"

interface Props {
  user: User
}

export const UserDetail = ({ user }: Props) => {
  return (
    <Card>
      <div className="flex flex-col items-center gap-4">

        <Avatar
          src={user.avatar}
          alt={user.first_name}
        />

        <h2 className="text-xl font-bold">
          {user.first_name} {user.last_name}
        </h2>

        <p className="text-gray-500">
          {user.email}
        </p>

      </div>
    </Card>
  )
}