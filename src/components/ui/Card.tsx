import { ReactNode, HTMLAttributes } from "react"
import clsx from "clsx"

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export const Card = ({ children, className, ...props }: Props) => {
  return (
    <div
      className={clsx(
        "bg-[#111827] border border-gray-800 rounded-xl p-5 shadow-sm",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
