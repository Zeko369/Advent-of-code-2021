import { loadData } from "../shared/index.js";

(async () => {
  for (const [name, data] of await loadData(import.meta.url, (row) => {
    return row.split("").map((a) => parseInt(a));
  })) {
    console.log(`------------- ${name} -------------`);

    // if (name !== "input2.txt") {
    //   continue;
    // }

    let lows = [];
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].length; j++) {
        if (i === 0) {
          if (j === 0) {
            if (data[i][j] < data[i + 1][j] && data[i][j] < data[i][j + 1]) {
              lows.push(data[i][j]);
            }
          } else if (j === data[i].length - 1) {
            if (data[i][j] < data[i][j - 1] && data[i][j] < data[i + 1][j]) {
              lows.push(data[i][j]);
            }
          } else {
            if (
              data[i][j] < data[i][j - 1] &&
              data[i][j] < data[i][j + 1] &&
              data[i][j] < data[i + 1][j]
            ) {
              lows.push(data[i][j]);
            }
          }
        } else if (i === data.length - 1) {
          if (j === 0) {
            if (data[i][j] < data[i - 1][j] && data[i][j] < data[i][j + 1]) {
              lows.push(data[i][j]);
            }
          } else if (j === data[i].length - 1) {
            if (data[i][j] < data[i][j - 1] && data[i][j] < data[i - 1][j]) {
              lows.push(data[i][j]);
            }
          } else {
            if (
              data[i][j] < data[i][j - 1] &&
              data[i][j] < data[i][j + 1] &&
              data[i][j] < data[i - 1][j]
            ) {
              lows.push(data[i][j]);
            }
          }
        } else {
          if (j === 0) {
            if (
              data[i][j] < data[i - 1][j] &&
              data[i][j] < data[i][j + 1] &&
              data[i][j] < data[i + 1][j]
            ) {
              lows.push(data[i][j]);
            }
          } else if (j === data[i].length - 1) {
            if (
              data[i][j] < data[i][j - 1] &&
              data[i][j] < data[i - 1][j] &&
              data[i][j] < data[i + 1][j]
            ) {
              lows.push(data[i][j]);
            }
          } else {
            if (
              data[i][j] < data[i - 1][j] &&
              data[i][j] < data[i + 1][j] &&
              data[i][j] < data[i][j - 1] &&
              data[i][j] < data[i][j + 1]
            ) {
              lows.push(data[i][j]);
            }
          }
        }
      }
    }

    console.log(lows.reduce((a, b) => a + b + 1, 0));

    const been = Array.from({ length: data.length }, (_, i) =>
      Array.from({ length: data[0].length }, (__, j) => data[i][j] === 9)
    );
    let queue = [[0, 0]];

    const getNeighbors = (x, y) => {
      const neighbors = [];
      if (x > 0) {
        neighbors.push([x - 1, y]);
      }
      if (x < data.length - 1) {
        neighbors.push([x + 1, y]);
      }
      if (y > 0) {
        neighbors.push([x, y - 1]);
      }
      if (y < data[0].length - 1) {
        neighbors.push([x, y + 1]);
      }
      return neighbors.filter(([x, y]) => !been[x][y] && data[x][y] < 9);
    };

    console.log("--- 2 ---");

    const thingies = [];
    while (
      been.map((a) => a.filter((b) => b).length).reduce((a, b) => a + b, 0) <
      data.length * data[0].length
    ) {
      let tmp = 0;
      while (queue.length > 0) {
        const [i, j] = queue.shift();
        if (been[i][j]) {
          continue;
        }

        been[i][j] = true;

        tmp++;
        queue.push(...getNeighbors(i, j));
      }
      thingies.push(tmp);

      for (let i = 0; i < been.length; i++) {
        for (let j = 0; j < been[i].length; j++) {
          if (!been[i][j]) {
            queue.push([i, j]);
            break;
          }
        }

        if (queue.length > 0) {
          break;
        }
      }
    }

    console.log(
      thingies
        .slice()
        .sort((a, b) => b - a)
        .slice(0, 3)
        .reduce((a, b) => a * b, 1)
    );
  }
})();
