import { writeJsonFile } from "write-json-file";
import { DbFile } from "../types/DbFile";
import { getDb } from "./getDb";

export function getLastPrimeInDb() {
  const dbPath = "./data/primes.json";
  const dbFile: DbFile = getDb();

  const hasPrimes = Object.keys(dbFile).some(
    (key) => key.toString() === "primes"
  );

  if (hasPrimes && dbFile.primes.length > 0)
    return dbFile.primes[dbFile.primes.length - 1];

  writeJsonFile(dbPath, { primes: [2] });
  return 2;
}
