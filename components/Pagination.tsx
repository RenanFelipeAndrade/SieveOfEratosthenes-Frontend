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
      if (
        previousState.page >=
        primes.length - previousState.perPage * (pagination.page + 1)
      )
        return previousState;
      return { ...previousState, page: previousState.page + 1 };
    });
  }

  return (
    <section className="mt-2">
      <div className="flex justify-between">
        <span>Per page: {pagination.perPage}</span>
        <span>Page: {pagination.page + 1}</span>
      </div>
      <div className="mt-2 flex justify-between">
        <button onClick={nextPage}>Back</button>
        <button onClick={previousPage}>Next</button>
      </div>
    </section>
  );
}
