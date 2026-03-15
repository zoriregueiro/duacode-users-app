interface Props {
  page: number
  totalPages: number
  onChange: (page: number) => void
}

export const Pagination = ({ page, totalPages, onChange }: Props) => {
  return (
    <div className="flex justify-center mt-10 gap-2">

      <button
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        className="px-3 py-1 border border-gray-700 rounded"
      >
        {"<"}
      </button>

      {Array.from({ length: totalPages }).map((_, i) => {
        const p = i + 1

        return (
          <button
            key={p}
            onClick={() => onChange(p)}
            className={`px-3 py-1 rounded ${
              p === page
                ? "bg-green-500 text-black"
                : "border border-gray-700"
            }`}
          >
            {p}
          </button>
        )
      })}

      <button
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
        className="px-3 py-1 border border-gray-700 rounded"
      >
        {">"}
      </button>

    </div>
  )
}