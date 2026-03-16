export const usePagination = <T>(items: T[], page: number, perPage: number) => {
  const start = (page - 1) * perPage
  const end = start + perPage

  return items.slice(start, end)
}
