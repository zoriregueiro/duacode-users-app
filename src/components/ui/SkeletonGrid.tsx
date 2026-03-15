import { SkeletonCard } from "./SkeletonCard"

export const SkeletonGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">

      {Array.from({ length: 8 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}

    </div>
  )
}