interface Props {
  title: string
  value: number
  subtitle?: string
  color?: string
}

export const StatsCard = ({
  title,
  value,
  subtitle,
  color = "text-green-400",
}: Props) => {
  return (
    <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
      <p className="text-sm text-gray-400">{title}</p>

      <div className="flex items-center gap-2 mt-2">
        <span className={`text-2xl font-bold ${color}`}>{value}</span>

        {subtitle && <span className="text-sm text-gray-500">{subtitle}</span>}
      </div>
    </div>
  )
}
