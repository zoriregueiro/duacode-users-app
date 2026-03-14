import { User } from "@/types/user.types"
import { Avatar } from "../ui/Avatar"
import { Card } from "../ui/Card"
import Link from "next/link"

interface Props {
  user: User
}

export const UserCard = ({ user }: Props) => {
  return (
    <Link href={`/users/${user.id}`}>

      <Card>

        <div className="flex flex-col items-center gap-2 cursor-pointer">

          <Avatar
            src={user.avatar}
            alt={user.first_name}
          />

          <p className="font-semibold">
            {user.first_name} {user.last_name}
          </p>

          <p className="text-sm text-gray-500">
            {user.email}
          </p>

        </div>

      </Card>

    </Link>
  )
}