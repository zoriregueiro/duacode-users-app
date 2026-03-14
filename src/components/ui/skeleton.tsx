export const Skeleton = () => {
  return (
    <div className="animate-pulse border p-4 rounded-lg">
      <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto"></div>
      <div className="h-4 bg-gray-300 mt-4 rounded"></div>
      <div className="h-3 bg-gray-200 mt-2 rounded"></div>
    </div>
  )
}