interface PrimesListProps {
  primes: number[];
}
export function PrimesList({ primes }: PrimesListProps) {
  return (
    <ul className="flex gap-2 flex-wrap">
      {primes.map((primeNumber) => (
        <li key={primeNumber}>{primeNumber};</li>
      ))}
    </ul>
  );
}
