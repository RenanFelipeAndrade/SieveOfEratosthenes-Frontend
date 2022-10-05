import { writeJsonFileSync } from "write-json-file";
import { getDb } from "./getDb";

export function getLastPrimeInDb() {
  const dbName = "primes";
  const { db } = getDb(dbName);

  const hasPrimes = Object.keys(db).some((key) => key.toString() === "primes");

  if (hasPrimes && db.primes.length > 0) return db.primes[db.primes.length - 1];

  writeJsonFileSync(dbName, { primes: [2] });
  return 2;
}
