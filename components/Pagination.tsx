import React from "react";

interface PaginationProps {
  primes: number[];
  pagination: { page: number; perPage: number };
  setPagination: (
    previousState: React.SetStateAction<{ page: number; perPage: number }>
  ) => void;
}

export function Pagination({
  pagination,
  setPagination,
  primes,
}: PaginationProps) {
  function nextPage() {
    setPagination((previousState) => {
      if (previousState.page === 0) return previousState;
      return { ...previousState, page: previousState.page - 1 };
    });
  }

  function previousPage() {
    setPagination((previousState) => {
      const primesRemaining =
        primes.length - previousState.perPage * (pagination.page + 1);

      if (previousState.page >= primesRemaining) return previousState;
      return { ...previousState, page: previousState.page + 1 };
    });
  }

  return (
    <section className="mt-2">
      <div className="flex justify-between">
        <div>
          <span>
            Per page:{" "}
            <select
              value={pagination.perPage}
              onChange={(e) => {
                setPagination((previousState) => {
                  return {
                    ...previousState,
                    perPage: Number(e.target.value),
                  };
                });
              }}
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
              <option value={50}>50</option>
              <option value={80}>80</option>
              <option value={130}>130</option>
              <option value={210}>210</option>
              <option value={primes.length}>all</option>
            </select>
          </span>
        </div>
        <span>Page: {pagination.page + 1}</span>
      </div>
      <div className="mt-2 flex justify-between">
        <button onClick={nextPage}>Back</button>
        <button onClick={previousPage}>Next</button>
      </div>
    </section>
  );
}
