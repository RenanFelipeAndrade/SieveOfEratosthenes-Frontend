import { writeJsonFile } from "write-json-file";
import { DbFile } from "../types/DbFile";
import { getDb } from "./getDb";

export function getLastPrimeInDb() {
  const dbName = "primes";
  const dbFile: DbFile = getDb(dbName);

  const hasPrimes = Object.keys(dbFile).some(
    (key) => key.toString() === "primes"
  );

  if (hasPrimes && dbFile.primes.length > 0)
    return dbFile.primes[dbFile.primes.length - 1];

  writeJsonFile(dbName, { primes: [2] });
  return 2;
}
