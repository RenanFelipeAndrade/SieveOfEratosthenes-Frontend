import { PrimesList } from "../components/PrimesList";
import axios from "axios";

interface HomeProps {
  primes: number[];
  maxRange: number;
  timeToCalc: number;
}

function Home({ maxRange, primes, timeToCalc }: HomeProps) {
  return (
    <div className="sm:px-10 px-4">
      <header>
        <h1 className="my-4 sm:text-3xl text-2xl font-semibold text-center sm:text-left">
          Sieve Of Eratosthenes
        </h1>
        {/* <div>
          <input type="text" name="primeInput" ref={primeRef} id="primeInput" />
        </div> */}
      </header>
      <main>
        <h1>The prime numbers between 0 and {maxRange}</h1>
        <p>The amount of primes is {primes.length}</p>
        <p>The time to calculate was {timeToCalc} ms</p>
      </main>
      <PrimesList primes={primes} />
    </div>
  );
}

export async function getServerSideProps() {
  const maxRange = 100;
  const fetchPrimes = async () =>
    await axios
      .get(`http://localhost:8000/number/${maxRange}`)
      .then((response) => response.data)
      .catch((error) => console.log(error));
  const initTime = performance.now();
  const primes = await fetchPrimes();
  const endTime = performance.now();
  const timeToCalc = endTime - initTime;
  return {
    props: { maxRange, primes, timeToCalc },
  };
}
export default Home;
