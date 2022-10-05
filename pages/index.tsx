import { writeJsonFile } from "write-json-file";
import { DbFile } from "../types/DbFile";
import { getDb } from "../utils/getDb";
import { getLastPrimeInDb } from "../utils/getLastPrimeInDb";
import { PrimesList } from "../components/PrimesList";

interface HomeProps {
  maxRange: number;
  primes: number[];
  timeSpent: number;
}

function Home({ maxRange, primes, timeSpent }: HomeProps) {
  return (
    <div>
      <header>
        <h1>The prime numbers between 0 and {maxRange}</h1>
        <p>The amount of primes is {primes.length}</p>
        <p>Time spent to calculate: {timeSpent} ms</p>
      </header>
      <PrimesList primes={primes} />
    </div>
  );
}

export function getServerSideProps() {
  const dbFile: DbFile = getDb();
  const lastPrimeInDb = getLastPrimeInDb();
  const maxRange = 150;
  const minRange = lastPrimeInDb;
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
  }

  function main() {
    numberArray[maxRange] = 1; // creates an empty array of nth order
    numberArray.fill(1, 0, maxRange);

    dbFile.primes.forEach((prime) => sieveOfEratosthenes(prime));

    for (let number = minRange; number < maxRange; number++) {
      if (numberArray[number] == 1 && !dbFile.primes.includes(number)) {
        calculatedPrimes.push(number);
      }
    }

    if (lastPrimeInDb < calculatedPrimes[calculatedPrimes.length - 1]) {
      writeJsonFile("./data/primes.json", {
        primes: [...dbFile.primes, ...calculatedPrimes],
      });
    }
    return dbFile.primes.filter((prime) => prime < maxRange);
  }
  const initialTime = Date.now();
  const primes = main();
  const endTime = Date.now();

  const timeSpent = endTime - initialTime;

  return {
    props: { maxRange, primes, timeSpent },
  };
}
export default Home;
