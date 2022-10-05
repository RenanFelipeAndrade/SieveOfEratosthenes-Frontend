import { readFileSync } from "fs";
import { writeJsonFile } from "write-json-file";

export function createDb(path: string) {
  if (path.includes("primes")) writeJsonFile(path, { primes: [2] });
  else writeJsonFile(path, {});
  return JSON.parse(readFileSync(path).toString());
}
