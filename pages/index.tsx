import { existsSync, readFileSync } from "fs";
import { writeJsonFile } from "write-json-file";

interface HomeProps {
  maxRange: number;
  primes: number[];
  dbFile: DbFile;
}
interface DbFile {
  primes: number[];
}

function Home({ maxRange, primes, dbFile }: HomeProps) {
  return (
    <div>
      <header>
        <h1>The prime numbers between 0 and {maxRange}</h1>
      </header>
      <ul className="numbers">
        {primes.map((primeNumber) => (
          <li key={primeNumber}>{primeNumber};</li>
        ))}
      </ul>
    </div>
  );
}

export function getServerSideProps() {
  const dbPath = "./data/primes.json";
  const dbInstance = () => {
    const hasDbFile = existsSync(dbPath);
    if (hasDbFile) return JSON.parse(readFileSync(dbPath).toString());
    writeJsonFile(dbPath, { primes: [2] });
    return JSON.parse(readFileSync(dbPath).toString());
  };

  const dbFile: DbFile = dbInstance();
  const getLastPrimeInDb = () => {
    const hasPrimes = Object.keys(dbFile).some(
      (key) => key.toString() === "primes"
    );

    if (hasPrimes && dbFile.primes.length > 0)
      return dbFile.primes[dbFile.primes.length - 1];

    writeJsonFile(dbPath, { primes: [2] });
    return 2;
  };

  const lastPrimeInDb = getLastPrimeInDb();
  const maxRange = 1000;
  const minRange = lastPrimeInDb;
  const numberArray: number[] = [];
  let primes: number[] = [];

  function sieveOfEratosthenes(number: number) {
    let composite: number = number * 2;

    if (number <= 1) {
      numberArray[number] = 0;
    } else if (numberArray[number] === 1) {
      while (composite < maxRange) {
        numberArray[composite] = 0;

        composite += number;
      }
    }

    if (number <= Math.sqrt(maxRange)) {
      sieveOfEratosthenes(number + 1);
    }
  }

  function main() {
    numberArray[maxRange] = 1;
    numberArray.fill(1, 0, maxRange);

    dbFile.primes.forEach((prime) => sieveOfEratosthenes(prime));

    for (let i = minRange; i < maxRange; i++) {
      if (numberArray[i] == 1 && !dbFile.primes.includes(i)) {
        primes.push(i);
      }
    }

    if (lastPrimeInDb < primes[primes.length - 1]) {
      writeJsonFile("./data/primes.json", {
        primes: [...dbFile.primes, ...primes],
      });
    }
    primes = dbFile.primes.filter((prime) => prime < maxRange);
  }
  main();

  return {
    props: { maxRange, primes, dbFile },
  };
}
export default Home;
