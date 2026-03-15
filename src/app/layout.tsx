import { ReactQueryProvider } from "@/providers/reactQueryProvider"
import "./globals.css"
import { Toaster } from "sonner"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="bg-[#0b0f14] text-gray-200">
        <ReactQueryProvider>
          {children}
          <Toaster position="top-right" richColors />
        </ReactQueryProvider>
      </body>
    </html>
  )
}
