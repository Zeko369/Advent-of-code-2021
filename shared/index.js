import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { readFile } from "fs/promises";

/**
 * @param {string} path
 * @param {(row: string, index: number) => any} mapper
 */
export const loadData = async (path, mapper = (a) => a) => {
  const files = ["input.txt", "input2.txt"];
  return Promise.all(
    files.map(async (file) => {
      const filePath = join(dirname(fileURLToPath(path)), file);
      const data = await readFile(filePath, "utf8");
      return data.split("\n").map(mapper);
    })
  );
};
