import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { readFile } from "fs/promises";

(async () => {
  const file = await readFile(join(dirname(fileURLToPath(import.meta.url)), "./input.txt"), "utf8");
  const lines = file.split("\n").map((a) => {
    return a;
  });

  console.log(lines);
})();
