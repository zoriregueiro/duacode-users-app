import { ReactQueryProvider } from "@/providers/reactQueryProvider"
import "./globals.css"


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es"   data-redeviation-bs-uid="acbkws9fmno">
      <body className="bg-[#0b0f14] text-gray-200">

        <ReactQueryProvider>
          {children}
        </ReactQueryProvider>

      </body>
    </html>
  )
}