import { dirname, join } from "path";
import { writeFile, stat, mkdir, copyFile } from "fs/promises";

import dotenv from "dotenv";

import axios from "axios";
import { fileURLToPath } from "url";

dotenv.config();
if (!process.env.SESSION_COOKIE) {
  throw new Error("SESSION_COOKIE not set");
}

(async () => {
  const date = new Date();
  if (date.getMonth() !== 11) {
    throw new Error("Not December");
  }

  const day = date.getDate();
  const baseDir = join(dirname(fileURLToPath(import.meta.url)), day < 10 ? `0${day}` : day);
  try {
    await stat(baseDir);
  } catch (err) {
    console.log(`Creating ${baseDir}`);
    await mkdir(baseDir);

    await copyFile(
      join(dirname(fileURLToPath(import.meta.url)), "./template/index.js"),
      join(baseDir, "index.js")
    );

    await writeFile(join(baseDir, "input.txt"), "");
    await writeFile(join(baseDir, "input2.txt"), "");
  }

  while (true) {
    const time = new Date();
    if (time.getHours() === 7) {
      const res = axios
        .get(`https://adventofcode.com/2021/day/${day}/input`, {
          headers: {
            Cookie: `session=${process.env.SESSION_COOKIE}`,
          },
        })
        .then((res) => writeFile(join(baseDir, "input.txt"), res.data.trim(), "utf8"))
        .catch((err) => {
          if (err.response.status === 404) {
            console.log("Not yet open");
            return;
          }

          throw err;
        })
        .then(() => true);

      if (res === true) {
        console.log("Done");
        break;
      }
    }

    console.log("Wait a sec...");
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
})();
