import { useState } from "react";
import { Pagination } from "./Pagination";

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
      <Pagination
        pagination={pagination}
        primes={primes}
        setPagination={setPagination}
      />
    </>
  );
}
