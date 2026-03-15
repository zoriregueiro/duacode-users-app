export const SkeletonCard = () => {
  return (
    <div className="bg-[#111827] border border-gray-800 rounded-xl p-5 animate-pulse">

      <div className="flex items-center gap-4">

        <div className="w-12 h-12 rounded-full bg-gray-700" />

        <div className="flex-1 space-y-2">
          <div className="h-4 w-32 bg-gray-700 rounded" />
          <div className="h-3 w-24 bg-gray-800 rounded" />
        </div>

      </div>

      <div className="mt-4 space-y-2">

        <div className="h-3 bg-gray-800 rounded w-full" />
        <div className="h-3 bg-gray-800 rounded w-5/6" />
        <div className="h-3 bg-gray-800 rounded w-4/6" />

      </div>

    </div>
  )
}