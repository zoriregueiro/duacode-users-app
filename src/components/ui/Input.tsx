interface Props {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export const Input = ({ value, onChange, placeholder }: Props) => {
  return (
    <input
      className="border p-2 rounded w-full"
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}
