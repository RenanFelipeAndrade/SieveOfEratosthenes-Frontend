import { writeJsonFileSync } from "write-json-file";
import { getDb } from "./getDb";
export function writeArrayInDb(dbName: string, data: any[]) {
  const { db, dbPath } = getDb(dbName);
  const entireData = [...db[dbName], ...data];
  writeJsonFileSync(dbPath, { [dbName]: entireData });
  return entireData;
}
