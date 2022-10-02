import { readdirSync, readFileSync } from "fs";
import { writeJsonFile } from "write-json-file";

interface HomeProps {
  maxRange: number;
  primes: number[];
  primesInDb: PrimesInDb;
}
interface PrimesInDb {
  primes: number[];
}

function Home({ maxRange, primes, primesInDb }: HomeProps) {
  console.log(primesInDb.primes);
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
  let maxRange = 200;
  let numberArray: number[] = [];
  let primes: number[] = [];
  let primesInDb: PrimesInDb = JSON.parse(
    readFileSync("../data/primes.json").toString()
  );

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
      if (primesInDb.primes.length < primes.length)
        writeJsonFile("../data/primes.json", { primes: primes });
    }
  }
  main();

  return {
    props: { maxRange, primes, primesInDb },
  };
}
export default Home;
