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
  console.log(dbFile);
  return (
    <div>
      <h1>Números primos entre 0 e {maxRange}</h1>
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
    writeJsonFile(dbPath, { primes: [] });
    return JSON.parse(readFileSync(dbPath).toString());
  };

  const lastPrimeInDb = () => {
    const hasPrimes = Object.keys(dbFile).some(
      (key) => key.toString() === "primes"
    );
    if (hasPrimes) return dbFile.primes[0];
    writeJsonFile(dbPath, { primes: [] });
    return 0;
  };

  const dbFile: DbFile = dbInstance();
  const maxRange = 100;
  const minRange = lastPrimeInDb();
  const numberArray: number[] = [];
  const primes: number[] = [];

  function sieveOfEratosthenes(position: number) {
    let composite: number = position * 2;

    if (position <= 1) {
      numberArray[position] = 0;
    } else if (numberArray[position] == 1) {
      while (composite < maxRange) {
        numberArray[composite] = 0;

        composite += position;
      }
    }

    if (position <= Math.sqrt(maxRange)) {
      sieveOfEratosthenes(position + 1);
    }
  }

  function main() {
    for (let i = 0; i < maxRange; i++) {
      numberArray[i] = 1;
    }

    sieveOfEratosthenes(0);

    for (let i = 0; i < maxRange; i++) {
      if (numberArray[i] == 1) {
        primes.push(i);
      }
      if (dbFile.primes[-1] < primes[-1])
        writeJsonFile("./data/primes.json", { primes: primes });
    }
  }
  main();

  return {
    props: { maxRange, primes, dbFile },
  };
}
export default Home;
