import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { readFile } from "fs/promises";

(async () => {
  const file = await readFile(join(dirname(fileURLToPath(import.meta.url)), "./input.txt"), "utf8");
  const lines = file.split("\n").map((a) => {
    const [pos, x] = a.split(" ");
    return [pos, parseInt(x)];
  });

  let x = 0;
  let y = 0;

  for (let i = 0; i < lines.length; i++) {
    const [pos, dist] = lines[i];

    if (pos === "forward") {
      x += dist;
    } else if (pos === "down") {
      y += dist;
    } else if (pos === "up") {
      y -= dist;
    }
  }

  console.log(x * y);

  x = 0;
  y = 0;

  let aim = 0;
  for (let i = 0; i < lines.length; i++) {
    const [pos, dist] = lines[i];

    if (pos === "forward") {
      x += dist;
      y += dist * aim;
    } else if (pos === "down") {
      aim += dist;
    } else if (pos === "up") {
      aim -= dist;
    }
  }

  console.log(x * y);
  return;
})();
