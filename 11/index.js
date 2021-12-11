import { loadData } from "../shared/index.js";

const steps = {
  1: `6594254334
3856965822
6375667284
7252447257
7468496589
5278635756
3287952832
7993992245
5957959665
6394862637`.split("\n"),
  2: `8807476555
5089087054
8597889608
8485769600
8700908800
6600088989
6800005943
0000007456
9000000876
8700006848`.split("\n"),
  3: `0050900866
8500800575
9900000039
9700000041
9935080063
7712300000
7911250009
2211130000
0421125000
0021119000`.split("\n"),
};

(async () => {
  for (const [name, data] of await loadData(import.meta.url, (row) => {
    return row.split("").map((a) => Number(a));
  })) {
    console.log(`------------- ${name} -------------`);
    // if (name !== "input.txt") {
    //   continue;
    // }

    const getNeighbors = (x, y) => {
      const neighbors = [];
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if (i === 0 && j === 0) {
            continue;
          }
          const nx = x + i;
          const ny = y + j;
          if (nx >= 0 && nx < data.length && ny >= 0 && ny < data[0].length) {
            neighbors.push([nx, ny]);
          }
        }
      }

      return neighbors;
    };

    let allFlashes = 0;
    let simultaneousFlashIndex = 0;
    for (let step = 0; step < 10000; step++) {
      // for (let i = 0; i < data.length; i++) {
      //   const a = data[i].join("");
      //   const b = steps[step]?.[i];
      //   console.log(a, b, a === b || b === undefined);
      // }
      // console.log("---------------");

      const flashed = [];
      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j++) {
          data[i][j]++;

          if (data[i][j] === 10) {
            flashed.push([i, j]);
            data[i][j] = 0;
          }
        }
      }

      const flashedThisStep = [...flashed];
      const hasFlashedThisStep = (x, y) => {
        for (const [fx, fy] of flashedThisStep) {
          if (fx === x && fy === y) {
            return true;
          }
        }
        return false;
      };

      while (flashed.length > 0) {
        const [x, y] = flashed.pop();
        const neighbors = getNeighbors(x, y);
        neighbors.forEach(([y1, x1]) => {
          if (hasFlashedThisStep(y1, x1)) {
            return;
          }

          data[y1][x1]++;

          if (data[y1][x1] === 10) {
            flashed.push([y1, x1]);
            flashedThisStep.push([y1, x1]);
            data[y1][x1] = 0;
          }
        });
      }

      if (step < 1000) {
        allFlashes += flashedThisStep.length;
      }

      if (flashedThisStep.length === data.length * data[0].length) {
        simultaneousFlashIndex = step + 1;
        break;
      }
    }

    console.log("Part1", allFlashes);
    console.log("Part2", simultaneousFlashIndex);
  }
})();
