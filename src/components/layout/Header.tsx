import { useRouter } from "next/navigation"

export const Header = () => {

  const router = useRouter()
  return (
    <div className="flex justify-between items-center mb-8">

      <div>
        <h1 className="text-xl font-bold">Usuarios</h1>
        <p className="text-sm text-gray-400">
          Gestión de equipo
        </p>
      </div>

      <input
        placeholder="Buscar usuario..."
        className="bg-[#111827] border border-gray-800 rounded-lg px-4 py-2 w-80"
      />

      <button className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg"  onClick={() => router.push("/users/create")}>
        Crear usuario
      </button>

    </div>
  )
}