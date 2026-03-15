import { User } from "@/types/user.types"
import { Avatar } from "../ui/Avatar"
import { Card } from "../ui/Card"
import { Mail, Building, Calendar } from "lucide-react"
import { useRouter } from "next/navigation"

interface Props {
  user: User
  onClick: () => void
  state?: "active" | "pending" | "inactive"
}
export const UserCard = ({ user, onClick, state }: Props) => {
  const router = useRouter()
  const statusColor = {
    active: "border-l-green-500",
    pending: "border-l-yellow-500",
    inactive: "border-l-gray-500",
  }

  const statusBadge = {
    active: "bg-green-500/20 text-green-400",
    pending: "bg-yellow-500/20 text-yellow-400",
    inactive: "bg-gray-500/20 text-gray-400",
  }
  return (
    <Card
      onClick={onClick}
      className={`cursor-pointer border-l-4 border-l-green-500 hover:shadow-lg hover:border-green-500 transition ${statusColor[state || "active"]}`}
    >
      <div className="flex items-center gap-4">
        <Avatar src={user.avatar} alt={user.first_name} />

        <div>
          <p className="font-semibold">
            {user.first_name} {user.last_name}
          </p>

          <p className="text-sm text-green-400">Developer</p>
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-400 space-y-2">
        <div className="flex items-center gap-2">
          <Mail size={14} />
          <span>{user.email}</span>
        </div>

        <div className="flex items-center gap-2">
          <Building size={14} />
          <span>Engineering</span>
        </div>

        <div className="flex items-center gap-2">
          <Calendar size={14} />
          <span>Desde 2022</span>
        </div>
      </div>
      <div className="flex justify-start mt-4 pt-3 border-t border-gray-800">
        <span
          className={`text-xs px-2 py-1 rounded ${
            statusBadge[state || "active"]
          }`}
        >
          {state || "Activo"}
        </span>
      </div>
    </Card>
  )
}
