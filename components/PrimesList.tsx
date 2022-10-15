import { useState } from "react";
import { Pagination } from "./Pagination";

interface PrimesListProps {
  primes: number[];
}
export function PrimesList({ primes }: PrimesListProps) {
  const [pagination, setPagination] = useState({ perPage: 10, page: 0 });
  const [reversed, setReversed] = useState(false);
  let initialPosition = pagination.page * pagination.perPage;
  let endPosition = pagination.perPage * (pagination.page + 1);
  if (reversed) {
    // values to slice at the end
    // only reverse the slice (line 39 or close) for better performance
    initialPosition = primes.length - endPosition;
    endPosition = primes.length - pagination.perPage * pagination.page;

    // length - perPage * page can be negative
    // which is not valid
    if (initialPosition < 0) initialPosition = 0;
    if (endPosition < 0) endPosition = primes.length;
  }
  const primeList = primes
    .slice(initialPosition, endPosition)
    .map((primeNumber) => <li key={primeNumber}>{primeNumber};</li>);
  return (
    <>
      <section className="flex justify-end mt-4 sm:mt-6 border-b-primary border-b-2">
        <div>
          <label>
            <span className="mr-4">Reversed</span>
            <input
              type="checkbox"
              checked={reversed}
              onChange={() => setReversed(!reversed)}
            />
          </label>
        </div>
      </section>
      <ul className="flex gap-2 flex-wrap my-2 justify-between">
        {reversed ? primeList.reverse() : primeList}
      </ul>
      <Pagination
        pagination={pagination}
        primes={primes}
        setPagination={setPagination}
      />
    </>
  );
}
