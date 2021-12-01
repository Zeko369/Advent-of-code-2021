import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { readFile } from "fs/promises";

(async () => {
  const file = await readFile(join(dirname(fileURLToPath(import.meta.url)), "./input.txt"), "utf8");
  const lines = file.split("\n").map((a) => {
    return parseInt(a);
  });

  let a = 0;
  for (let i = 0; i < lines.length - 1; i++) {
    if (lines[i] < lines[i + 1]) {
      a++;
    }
  }

  console.log(a);

  let tmp = [];
  for (let i = 0; i < lines.length - 2; i++) {
    tmp[i] = 0;
    for (let j = 0; j < 3; j++) {
      tmp[i] += lines[i + j];
    }
  }

  let b = 0;
  for (let i = 0; i < tmp.length; i++) {
    if (tmp[i] < tmp[i + 1]) {
      b++;
    }
  }

  console.log(b);
})();
