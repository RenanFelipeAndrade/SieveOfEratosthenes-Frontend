import { existsSync, readFileSync } from "fs";
import { createDb } from "./createDb";

export function getDb(dbName: string) {
  const dbPath = `./data/${dbName}.json`;
  const hasDbFile = existsSync(dbPath);
  if (hasDbFile)
    return { db: JSON.parse(readFileSync(dbPath).toString()), dbPath };
  return { db: createDb(dbPath), dbPath };
}
