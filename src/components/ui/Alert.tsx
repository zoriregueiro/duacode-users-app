interface Props {
  message: string
}

export const Alert = ({ message }: Props) => {
  return (
    <div className="mb-6 rounded-lg border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-400">
      {message}
    </div>
  )
}
