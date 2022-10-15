import { PaginationProps } from "./Pagination";

export function PerPageSelector({
  pagination,
  setPagination,
  primes,
}: PaginationProps) {
  const perPageOptions: JSX.Element[] = [];
  let previousFiboValue = 0;
  const numberOfOptions = 11;
  // generate all option tags
  for (let i = 0; i < numberOfOptions; i++) {
    const fiboValue = fibonacci(i);
    if (fiboValue !== previousFiboValue) {
      previousFiboValue = fiboValue;
      const number = Number(fiboValue.toString() + "0");
      const element = (
        <option key={number} value={number}>
          {number}
        </option>
      );
      perPageOptions.push(element);
    }
  }

  function fibonacci(n: number): number {
    if (n <= 1) return 1;
    return fibonacci(n - 2) + fibonacci(n - 1);
  }

  return (
    <select
      value={pagination.perPage}
      className="rounded"
      onChange={(e) => {
        setPagination((previousState) => {
          return {
            ...previousState,
            perPage: Number(e.target.value),
          };
        });
      }}
    >
      {perPageOptions}
      <option value={primes.length}>all</option>
    </select>
  );
}
