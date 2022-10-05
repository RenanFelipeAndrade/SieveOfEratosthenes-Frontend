import { useState } from "react";

interface PrimesListProps {
  primes: number[];
}
export function PrimesList({ primes }: PrimesListProps) {
  const [pagination, setPagination] = useState({ perPage: 10, page: 0 });
  return (
    <>
      <ul className="flex gap-2 flex-wrap mt-4 text-white">
        {primes
          .slice(
            pagination.page * pagination.perPage,
            pagination.perPage * (pagination.page + 1)
          )
          .map((primeNumber) => (
            <li key={primeNumber}>{primeNumber};</li>
          ))}
      </ul>
      <section className="mt-2">
        <div className="flex justify-between">
          <span>Per page: {pagination.perPage}</span>
          <span>Page: {pagination.page + 1}</span>
        </div>
        <div className="mt-2 flex justify-between">
          <button
            onClick={() =>
              setPagination((previousState) => {
                if (previousState.page === 0) return previousState;
                return { ...previousState, page: previousState.page - 1 };
              })
            }
          >
            Back
          </button>
          <button
            onClick={() =>
              setPagination((previousState) => {
                if (
                  previousState.page >=
                  primes.length - previousState.perPage * (pagination.page + 1)
                )
                  return previousState;
                return { ...previousState, page: previousState.page + 1 };
              })
            }
          >
            Next
          </button>
        </div>
      </section>
    </>
  );
}
