import { StatsCard } from "./StatsCard"

interface Props {
  totalUsers: number
}

export const StatsGrid = ({ totalUsers }: Props) => {
  const total = totalUsers
  const pending = totalUsers > 7 ? 3 : 0
  const activeUsers = totalUsers - pending

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      <StatsCard title="Total Usuarios" value={total} />

      <StatsCard title="Activos" value={activeUsers} subtitle="(83%)" />

      <StatsCard
        title="Pendientes"
        value={pending}
        subtitle="por revisar"
        color="text-yellow-400"
      />

      <StatsCard
        title="Inactivos"
        value={0}
        subtitle="usuarios"
        color="text-gray-400"
      />
    </div>
  )
}
