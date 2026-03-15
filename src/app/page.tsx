"use client"

import { useEffect, useMemo, useState } from "react"
import { useUsers } from "@/hooks/useUsers"
import { Header } from "@/components/layout/Header"
import { UserList } from "@/components/users/UserList"
import { User } from "@/types/user.types"
import { UserDrawer } from "@/components/layout/UserDrawer"
import { StatsGrid } from "@/components/ui/StatsGrid"
import { Alert } from "@/components/ui/Alert"
import { EmptyState } from "@/components/ui/EmptyState"
import { SkeletonGrid } from "@/components/ui/SkeletonGrid"
import { Pagination } from "@/components/ui/Pagination"
import { useDebounce } from "@/hooks/useDebounce"
import { useUpdateUser, useDeleteUser } from "@/hooks/useUsersMutations"
import { CreateUserModal } from "@/components/users/CreateUserModal"
import { useCreateUser } from "@/hooks/useUsersMutations"

export default function Home() {
  const [page, setPage] = useState(1)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [search, setSearch] = useState("")
  const [drawerMode, setDrawerMode] = useState<"view" | "edit">("view")
  const [isCreateOpen, setIsCreateOpen] = useState(false)

  const { data, error, isLoading } = useUsers(page)

  const users = data?.data || []

  const debouncedSearch = useDebounce(search, 400)

  const filteredUsers = useMemo(() => {
    if (!debouncedSearch) return users

    const term = debouncedSearch.toLowerCase()

    return users.filter(
      (user) =>
        user.first_name.toLowerCase().includes(term) ||
        user.last_name.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term),
    )
  }, [users, debouncedSearch])

  const updateMutation = useUpdateUser()
  const deleteMutation = useDeleteUser()
  const createMutation = useCreateUser()

  const isDrawerOpen = !!selectedUser

  useEffect(() => {
    setPage(1)
  }, [debouncedSearch])

  return (
    <main className="min-h-screen bg-[#0b0f14] text-gray-200 p-10">
      <div
        className={`transition-all max-w-7xl mx-auto ${
          isDrawerOpen ? "blur-sm opacity-60" : ""
        }`}
      >
        <Header
          onCreateUser={() => setIsCreateOpen(true)}
          search={search}
          onSearch={setSearch}
        />

        <StatsGrid />

        {error && (
          <Alert message="No se pudieron cargar los usuarios. Intenta de nuevo." />
        )}

        {isLoading && <SkeletonGrid />}

        {!isLoading && !error && users.length === 0 && (
          <EmptyState type="users" />
        )}

        {!isLoading &&
          !error &&
          users.length > 0 &&
          filteredUsers.length === 0 && <EmptyState type="search" />}

        {!isLoading && !error && users.length > 0 && (
          <UserList
            users={filteredUsers}
            onSelect={(user) => {
              setSelectedUser(user)
              setDrawerMode("view")
            }}
          />
        )}

        {filteredUsers.length > 0 && (
          <Pagination
            page={page}
            totalPages={data?.total_pages || 1}
            onChange={setPage}
          />
        )}
      </div>

      <UserDrawer
        user={selectedUser}
        mode={drawerMode}
        onEdit={() => setDrawerMode("edit")}
        onClose={() => setSelectedUser(null)}
        onSave={(data) => {
          if (!selectedUser) return

          updateMutation.mutate(
            { id: selectedUser.id, data },
            {
              onSuccess: () => {
                setSelectedUser(null)
                setDrawerMode("view")
              },
            },
          )
        }}
        onDelete={(id) => deleteMutation.mutate(id)}
      />

      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setSelectedUser(null)}
        />
      )}

      <CreateUserModal
        open={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onCreate={(data) => {
          createMutation.mutate(data, {
            onSuccess: () => {
              setIsCreateOpen(false)
              setPage(1)
            },
          })
        }}
      />
    </main>
  )
}
