import { StatsCard } from "./StatsCard"

export const StatsGrid = () => {
  return (
    <div className="grid grid-cols-4 gap-6 mb-10">
      <StatsCard title="Total Usuarios" value={24} />

      <StatsCard title="Activos" value={20} subtitle="(83%)" />

      <StatsCard
        title="Pendientes"
        value={3}
        subtitle="por revisar"
        color="text-yellow-400"
      />

      <StatsCard
        title="Inactivos"
        value={1}
        subtitle="usuarios"
        color="text-gray-400"
      />
    </div>
  )
}
