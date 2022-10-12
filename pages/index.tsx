import { PrimesList } from "../components/PrimesList";
import axios from "axios";
import { FormEvent, useRef, useState } from "react";
import { GetServerSidePropsContext } from "next";

interface HomeProps {
  primes: number[];
  maxRange: number;
  timeToCalc: number;
}

function Home({ maxRange, primes, timeToCalc }: HomeProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div className="sm:px-10 px-4">
      <header>
        <h1 className="my-4 sm:text-3xl text-2xl font-semibold text-center sm:text-left">
          Sieve Of Eratosthenes
        </h1>
        <form>
          <input
            type="number"
            id="range"
            name="range"
            ref={inputRef}
            // onChange={handleLimit}
            required
          />
          <button type="submit">Calculate</button>
        </form>
      </header>
      <main className="sm:mt-6 mt-4">
        <p>From 2 to {maxRange}</p>
        <p>The amount of primes is {primes.length}</p>
        <p>The time to calculate was {timeToCalc} ms</p>
      </main>
      <PrimesList primes={primes} />
    </div>
  );
}

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  const maxRange = query.range ?? 100;
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
