import { Users, Search, Plus } from "lucide-react"

interface Props {
  search: string
  onSearch: (value: string) => void
  onCreateUser: () => void
}

export const Header = ({ search, onSearch, onCreateUser }: Props) => {
  return (
    <header
      className="
      sticky top-0 z-30
      w-full
      border-b border-gray-800
      backdrop-blur
      bg-[#0b0f14]/80
      mb-2
      "
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4">
        <div className="flex items-center gap-3">
          <div className="bg-green-500 p-3 rounded-lg">
            <Users className="text-black" size={20} />
          </div>

          <div>
            <h1 className="text-lg font-semibold text-white">Usuarios</h1>

            <p className="text-sm text-gray-400">Gestión de equipo</p>
          </div>
        </div>

        <div className="relative w-[420px]">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Buscar usuario..."
            className="
            w-full
            pl-9 pr-4 py-2
            bg-[#0f172a]
            border border-gray-800
            rounded-lg
            text-sm
            focus:outline-none
            focus:border-green-500
            "
          />
        </div>

        <button
          onClick={onCreateUser}
          className="
          flex items-center gap-2
          bg-green-500
          hover:bg-green-600
          text-black
          font-medium
          px-4 py-2
          rounded-lg
          text-sm
          transition
          "
        >
          <Plus size={16} />
          Crear usuario
        </button>
      </div>
    </header>
  )
}
