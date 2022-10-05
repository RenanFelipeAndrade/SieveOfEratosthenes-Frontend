import { readFileSync } from "fs";
import { writeJsonFileSync } from "write-json-file";

export function createDb(path: string) {
  if (path.includes("primes")) writeJsonFileSync(path, { primes: [2] });
  else writeJsonFileSync(path, {});
  return JSON.parse(readFileSync(path).toString());
}
