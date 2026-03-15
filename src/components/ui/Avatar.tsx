import { User } from "lucide-react"

interface Props {
  src?: string
  alt?: string
}

export const Avatar = ({ src, alt }: Props) => {
  if (!src) {
    return (
      <div
        className="
        w-14 h-14
        rounded-full
        bg-gray-800
        flex items-center justify-center
        border border-gray-700
        "
      >
        <User size={20} className="text-gray-400" />
      </div>
    )
  }

  return (
    <img src={src} alt={alt} className="w-14 h-14 rounded-full object-cover" />
  )
}
