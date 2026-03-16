"use client"

import { useEffect, useState } from "react"
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
import { usePagination } from "@/hooks/usePagination"
import { useMergedUsers } from "@/hooks/useMergergedUsers"
import { useUserSearch } from "@/hooks/useUserSearch"

export default function Home() {
  const USERS_PER_PAGE = 6

  const [page, setPage] = useState(1)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [search, setSearch] = useState("")
  const [drawerMode, setDrawerMode] = useState<"view" | "edit">("view")
  const [isCreateOpen, setIsCreateOpen] = useState(false)

  const { data, error, isLoading } = useUsers()

  const apiUsers: User[] = data?.data || []

  const users = useMergedUsers(apiUsers)

  const debouncedSearch = useDebounce(search, 400)

  const filteredUsers = useUserSearch(users, debouncedSearch)

  const paginatedUsers = usePagination(filteredUsers, page, USERS_PER_PAGE)

  const updateMutation = useUpdateUser()
  const deleteMutation = useDeleteUser()
  const createMutation = useCreateUser()

  const isDrawerOpen = !!selectedUser

  return (
    <main className="min-h-screen bg-[#0b0f14] text-gray-200 p-4 sm:p-6 lg:p-10">
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

        <StatsGrid totalUsers={users.length} />

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
            users={paginatedUsers}
            onSelect={(user) => {
              setSelectedUser(user)
              setDrawerMode("view")
            }}
          />
        )}

        {filteredUsers.length > 0 && (
          <Pagination
            page={page}
            totalPages={Math.ceil(filteredUsers.length / USERS_PER_PAGE)}
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
        onDelete={(id) => {
          deleteMutation.mutate(id)
          setSelectedUser(null)
        }}
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
