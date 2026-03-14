"use client"

import { useState } from "react"
import { useUsers } from "@/hooks/useUsers"
import { Header } from "@/components/layout/Header"
import { UserList } from "@/components/users/UserList"
import { User } from "@/types/user.types"
import { UserDrawer } from "@/components/layout/UserDrawer"
import { StatsGrid } from "@/components/ui/StatsGrid"

export default function Home() {

  const { data } = useUsers(1)
  
const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const isDrawerOpen = !!selectedUser
  return (
   <main className="min-h-screen bg-[#0b0f14] text-gray-200 p-10">
<div
  className={`transition-all max-w-7xl mx-auto ${
    isDrawerOpen ? "blur-sm opacity-60" : ""
  }`}
>
  <Header />
  <StatsGrid />
<UserList
  users={data?.data || []}
  onSelect={(user) => {
    console.log("USER CLICKED", user)
    setSelectedUser(user)
  }}
/>
</div>

      <UserDrawer
        user={selectedUser}
        onClose={() => setSelectedUser(null)}
      />

   {isDrawerOpen && (
  <div
    className="fixed inset-0 bg-black/40 z-40"
    onClick={() => setSelectedUser(null)}
  />
)}

    </main>
  )
}