interface AvatarProps {
  src: string
  alt: string
}

export const Avatar = ({ src, alt }: AvatarProps) => {
  return (
    <img
      src={src}
      alt={alt}
      className="w-20 h-20 rounded-full object-cover"
    />
  )
}