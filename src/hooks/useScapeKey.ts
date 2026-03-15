import { useEffect } from "react"

export const useEscapeKey = (onClose: () => void) => {

  useEffect(() => {

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    window.addEventListener("keydown", handleKey)

    return () => {
      window.removeEventListener("keydown", handleKey)
    }

  }, [onClose])

}