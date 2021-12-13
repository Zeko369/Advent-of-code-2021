import { loadData } from "../shared/index.js";

(async () => {
  for (const [name, data] of await loadData(import.meta.url, (row) => {
    if (row.includes(",")) {
      return row.split(",").map(Number);
    }

    if (row === "") {
      return null;
    }

    return row.split(" ").slice(2);
  })) {
    console.log(`------------- ${name} -------------`);
    // if (name === "input.txt") {
    //   continue;
    // }

    const dots = data.slice(0, data.indexOf(null));
    const folds = data.slice(data.indexOf(null) + 1).map((a) => a[0].split("="));

    let maxX = dots.reduce((max, dot) => Math.max(max, dot[0]), 0);
    let maxY = dots.reduce((max, dot) => Math.max(max, dot[1]), 0);

    console.log(maxX, maxY);

    let matrix = Array.from(new Array(maxY + 1), () => new Array(maxX + 1).fill(0));
    dots.forEach((dot) => {
      matrix[dot[1]][dot[0]] = 1;
    });

    const print = () => {
      matrix.forEach((row) => {
        console.log(row.map((dot) => (dot ? "#" : ".")).join(""));
      });
    };

    for (let i = 0; i < folds.length; i++) {
      const [dir, value] = folds[i];

      if (dir == "y") {
        const val = parseInt(value);
        for (let i = 0; i < val; i++) {
          const a = i;
          const b = val + val - i;

          if (b == a) {
            continue;
          }

          for (let j = 0; j < matrix[0].length; j++) {
            if (matrix[a] === undefined || matrix[b] === undefined) {
              continue;
            }
            matrix[a][j] = matrix[b][j] || matrix[a][j];
          }
        }

        matrix = matrix.slice(0, val);
      } else {
        const val = parseInt(value);
        for (let i = 0; i < val; i++) {
          const a = i;
          const b = val + val - i;

          if (b == a) {
            continue;
          }

          for (let j = 0; j < matrix.length; j++) {
            if (matrix[j][a] === undefined || matrix[j][b] === undefined) {
              continue;
            }

            matrix[j][a] = matrix[j][b] || matrix[j][a];
          }
        }

        matrix = matrix.map((row) => row.slice(0, val));
      }

      if (i == 0) {
        console.log(
          "Part1",
          matrix.reduce((sum, row) => sum + row.reduce((sum, dot) => sum + dot, 0), 0)
        );
      }
    }

    // console.log("final");
    print();
  }
})();
