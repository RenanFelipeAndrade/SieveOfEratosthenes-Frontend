import { PrimesList } from "../components/PrimesList";
import axios, { AxiosError } from "axios";
import { useRef } from "react";
import { GetServerSidePropsContext } from "next";
import { formatMiliseconds } from "../utils/formatMiliseconds";
import { formatNumber } from "../utils/formatNumber";
import { Button } from "../components/Button";

interface HomeProps {
  primes: number[];
  maxRange: number;
  timeToCalc: number;
  axiosError?: AxiosError;
}

function Home({ maxRange, primes, timeToCalc, axiosError }: HomeProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  if (axiosError) {
    return (
      <div className="h-full flex justify-center items-center">
        <div className="text-center">
          <h1 className="text-3xl">Sorry, but the server is down</h1>
          <p>Make sure to have the server running to use the app</p>
          <p className="mt-4">
            <a
              href="https://github.com/RenanFelipeAndrade/sieve-of-eratosthenes-server"
              className="text-primary font-bold hover:text-secundary transition-colors"
            >
              More info here
            </a>
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="sm:px-10 px-4 max-w-6xl mx-auto">
      <header>
        <h1 className="my-4 sm:text-3xl text-2xl font-bold text-center sm:text-left text-primary">
          Sieve Of Eratosthenes
        </h1>
        <form className="flex">
          <input
            type="number"
            className="block w-full sm:max-w-[10rem] rounded p-1 mr-2"
            id="range"
            name="range"
            max={9999999}
            min={3}
            ref={inputRef}
            placeholder="From 2 to ..."
            required
          />
          <Button type="submit">Calculate</Button>
        </form>
      </header>
      <main className="sm:mt-6 mt-4">
        <p>
          From 2 to{" "}
          <span className="text-primary font-bold">
            {formatNumber(maxRange)}
          </span>
        </p>
        <p>The amount of primes is {primes.length}</p>
        <p>The time to calculate was {formatMiliseconds(timeToCalc)}</p>
      </main>
      <PrimesList primes={primes} />
    </div>
  );
}

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  function serializeError(error: AxiosError) {
    return {
      message: error.message ?? "",
      name: error.name ?? "",
      stack: error.stack ?? "",
      code: error.code ?? "",
      response: {
        data: error.response?.data ?? "",
        status: error.response?.status ?? "",
        statusText: error.response?.statusText ?? "",
        headers: error.response?.headers ?? "",
      },
      request: {
        method: error.request.method ?? "",
        url: error.request.url ?? "",
        headers: error.request.headers ?? "",
        data: error.request.data ?? "",
      },
    };
  }

  const url = process.env.API_URL;
  let axiosError = {};
  const maxRange = Number(query.range) > 2 ? query.range : 3;
  const fetchPrimes = async () =>
    await axios
      .get(`${url}/number/${maxRange}`)
      .then((response) => {
        return response.data;
      })
      .catch((error: unknown) => {
        if (axios.isAxiosError(error)) {
          axiosError = serializeError(error);
        }
      });
  const initTime = performance.now();
  const primes = (await fetchPrimes()) ?? [2, 3];
  const endTime = performance.now();
  const timeToCalc = endTime - initTime;
  return {
    props: { maxRange, primes, timeToCalc, axiosError: axiosError },
  };
}
export default Home;
