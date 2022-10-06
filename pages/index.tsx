import { getDb } from "../utils/getDb";
import { getLastPrimeInDb } from "../utils/getLastPrimeInDb";
import { PrimesList } from "../components/PrimesList";
import { writeArrayInDb } from "../utils/writeArrayInDb";
import { DbPrimes } from "../types/DbPrimes";

interface HomeProps {
  maxRange: number;
  primes: number[];
}

function Home({ maxRange, primes }: HomeProps) {
  return (
    <div>
      <header>
        <h1>The prime numbers between 0 and {maxRange}</h1>
        <p>The amount of primes is {primes.length}</p>
      </header>
      <PrimesList primes={primes} />
    </div>
  );
}

export function getServerSideProps() {
  const { db: dbFile }: DbPrimes = getDb("primes");
  const lastPrimeInDb = getLastPrimeInDb();
  const maxRange = 900000;
  const numberArray: number[] = [];
  const calculatedPrimes: number[] = [];

  function sieveOfEratosthenes(number: number) {
    /**
     * Write all numbers from 2 to N. Do not consider them prime or composite (2 or more distinct divisors).
     * Takes the first number that hasn't been marked as composite, consider it's prime.
     * From that prime number, run through all its multiples up to N and mark them as composites
     * Repeat from step 2.
     */
    if (number <= 1) {
      numberArray[number] = 0;
    } else if (numberArray[number] === 1) {
      for (
        let composite = number * 2;
        composite < maxRange;
        composite += number
      )
        numberArray[composite] = 0;
    }

    if (number <= Math.sqrt(maxRange)) sieveOfEratosthenes(number + 1);
    // if (number <= Math.sqrt(maxRange)) return;
  }

  function main() {
    if (lastPrimeInDb > maxRange - 10)
      return dbFile.primes.filter((prime) => prime < maxRange);
    for (let number = 0; number < maxRange; number++) numberArray[number] = 1;

    sieveOfEratosthenes(0);
    for (let number = 0; number < maxRange; number++) {
      if (numberArray[number] == 1) {
        calculatedPrimes.push(number);
      }
    }
    writeArrayInDb("primes", calculatedPrimes);
    return calculatedPrimes;
  }
  const primes = main();

  return {
    props: { maxRange, primes },
  };
}
export default Home;
