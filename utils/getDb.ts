import { existsSync, readFileSync } from "fs";
import { writeJsonFile } from "write-json-file";

export function getDb() {
  const dbPath = "./data/primes.json";
  const hasDbFile = existsSync(dbPath);

  if (hasDbFile) return JSON.parse(readFileSync(dbPath).toString());

  writeJsonFile(dbPath, { primes: [2] });
  return JSON.parse(readFileSync(dbPath).toString());
}
