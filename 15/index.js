import { loadData } from "../shared/index.js";

(async () => {
  for (const [name, data] of (
    await loadData(import.meta.url, (row) => {
      return row.split("").map(Number);
    })
  ).sort((a, b) => b[0].length - a[0].length)) {
    console.log(`------------- ${name} -------------`);
    // if (name === "input.txt") {
    //   continue;
    // }

    const originalXLen = data[0].length;
    const originalYLen = data.length;
    for (let i = 0; i < originalYLen; i++) {
      for (let k = 1; k < 5; k++) {
        for (let j = 0; j < originalXLen; j++) {
          let tmp = data[i][j] + k;
          if (tmp > 9) {
            tmp -= 9;
          }

          data[i].push(tmp);
        }
      }
    }

    for (let k = 1; k < 5; k++) {
      for (let i = 0; i < originalYLen; i++) {
        const arr = [];

        for (let j = 0; j < data[i].length; j++) {
          let tmp = data[i][j] + k;
          if (tmp > 9) {
            tmp -= 9;
          }

          arr.push(tmp);
        }

        data.push(arr);
      }
    }

    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].length; j++) {
        if (data[i][j] !== data[i][j]) {
          console.log("Wrong", i, j);
        }
      }
    }

    class Cell {
      constructor(x, y, distance) {
        this.x = x;
        this.y = y;
        this.distance = distance;
      }
    }

    const xLen = data[0].length;
    const yLen = data.length;

    const dis = Array.from(new Array(xLen), () => new Array(yLen).fill(1000000000));
    const dx = [1, 0, -1, 0];
    const dy = [0, 1, 0, -1];

    const isInsideGrid = (i, j) => i >= 0 && i < yLen && j >= 0 && j < xLen;
    const st = [new Cell(0, 0, 0)];

    dis[0][0] = 0;
    while (st.length) {
      let k = st[0];
      st.shift();

      for (var i = 0; i < 4; i++) {
        const x = k.x + dx[i];
        const y = k.y + dy[i];

        if (!isInsideGrid(x, y)) continue;

        if (dis[x][y] > dis[k.x][k.y] + data[x][y]) {
          dis[x][y] = dis[k.x][k.y] + data[x][y];
          st.push(new Cell(x, y, dis[x][y]));
        }
      }

      st.sort((a, b) => {
        if (a.distance == b.distance) {
          if (a.x != b.x) return a.x - b.x;
          else return a.y - b.y;
        }
        return a.distance - b.distance;
      });
    }

    // for (let i = 0; i < yLen; i++) {
    //   console.log(dis[i].join(" "));
    // }

    console.log(dis[yLen - 1][xLen - 1]);

    // const queue = [[0, [0, 0]]];
    // const costs = [];

    // const posMinCost = {};
    // while (queue.length) {
    //   const [cost, [x, y]] = queue.pop();
    //   const [nx, ny] = [x + 1, y];
    //   const [dx, dy] = [x, y + 1];

    //   if (y === data.length - 1 && x === data[0].length - 1) {
    //     costs.push(cost);
    //     continue;
    //   }

    //   if (data[ny] && data[ny][nx]) {
    //     if (
    //       posMinCost[`${nx},${ny}`] === undefined ||
    //       posMinCost[`${nx},${ny}`] > cost + data[ny][nx]
    //     ) {
    //       posMinCost[`${nx},${ny}`] = cost + data[ny][nx];
    //       queue.push([cost + data[nx][ny], [nx, ny]]);
    //     }
    //   }

    //   if (data[dy] && data[dy][dx]) {
    //     if (
    //       posMinCost[`${dx},${dy}`] === undefined ||
    //       posMinCost[`${dx},${dy}`] > cost + data[dy][dx]
    //     ) {
    //       posMinCost[`${dx},${dy}`] = cost + data[dy][dx];
    //       queue.push([cost + data[dx][dy], [dx, dy]]);
    //     }
    //   }
    // }

    // console.log(costs.sort((a, b) => a - b)[0]);
  }
})();
