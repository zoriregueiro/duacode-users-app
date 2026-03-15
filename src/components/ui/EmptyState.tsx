import { Search, Users } from "lucide-react"

interface Props {
  type?: "search" | "users"
}

export const EmptyState = ({ type = "users" }: Props) => {

  const config = {
    users: {
      icon: <Users size={20} />,
      title: "No hay usuarios todavía",
      description: "Empieza creando tu primer usuario",
    },
    search: {
      icon: <Search size={20} />,
      title: "No se encontraron usuarios",
      description: "Intenta con un término de búsqueda diferente",
    },
  }

  const state = config[type]

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center text-gray-400">

      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-800">
        {state.icon}
      </div>

      <h3 className="text-lg text-gray-200">
        {state.title}
      </h3>

      <p className="text-sm text-gray-500">
        {state.description}
      </p>

    </div>
  )
}