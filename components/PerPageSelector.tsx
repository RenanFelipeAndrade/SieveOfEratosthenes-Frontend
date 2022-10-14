import { PaginationProps } from "./Pagination";

export function PerPageSelector({
  pagination,
  setPagination,
  primes,
}: PaginationProps) {
  return (
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
  );
}
