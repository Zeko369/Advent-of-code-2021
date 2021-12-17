import { loadData } from "../shared/index.js";

(async () => {
  for (const [name, data] of await loadData(import.meta.url, (row) => {
    // target area: x=20..30, y=-10..-5
    return row
      .slice(13)
      .split(", ")
      .map((a) => a.slice(2).split("..").map(Number));
  })) {
    console.log(`------------- ${name} -------------`);
    // if (name === "input.txt") {
    //   continue;
    // }

    const [x1, x2] = data[0][0];
    const [y1, y2] = data[0][1];

    const inTarget = (x, y) => x >= x1 && x <= x2 && y >= y1 && y <= y2;
    const passedTarget = (x, y) => {
      if (x > x2 || y < y1) {
        return true;
      }

      return false;
    };

    let maxH = 0;
    let count = 0;
    for (let i = 1; i < 1000; i++) {
      for (let j = -1000; j < 1000; j++) {
        const tmp = [0, 0];
        const vel = [i, j];

        // let limit = 0;
        let tmpMaxH = maxH;
        while (!inTarget(...tmp) && !passedTarget(...tmp)) {
          tmp[0] += vel[0];
          tmp[1] += vel[1];

          if (vel[0] < 0) {
            vel[0]++;
          } else if (vel[0] > 0) {
            vel[0]--;
          }

          vel[1]--;

          if (tmp[1] > tmpMaxH) {
            tmpMaxH = tmp[1];
          }

          // limit++;
          // if (limit > 100) {
          //   break;
          // }
        }

        if (inTarget(...tmp)) {
          count++;
          maxH = tmpMaxH;
        }
      }
    }

    console.log("Part1", maxH);
    console.log("Part2", count);
  }
})();
