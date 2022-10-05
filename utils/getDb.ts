import { existsSync, readFileSync } from "fs";
import { createDb } from "./createDb";

export function getDb(dbName: string) {
  const dbPath = `./data/${dbName}.json`;
  const hasDbFile = existsSync(dbPath);
  if (hasDbFile) return JSON.parse(readFileSync(dbPath).toString());
  return createDb(dbPath);
}
