import { loadData } from "../shared/index.js";

(async () => {
  for (const [name, data] of await loadData(import.meta.url, (row, index) => {
    if (index === 0) {
      return row.split(",").map(Number);
    }

    if (row === "") {
      return undefined;
    }

    return row
      .split(" ")
      .map((a) => a.trim())
      .filter(Boolean)
      .map(Number);
  })) {
    let data2 = data.filter(Boolean);

    console.log(`------------- ${name} -------------`);

    let shouldBreak = false;
    const wins = [];
    const scores = {};

    for (let i = 0; i < data2[0].length; i++) {
      const picked = new Set(data2[0].slice(0, i));

      for (let j = 0; j < (data2.length - 1) / 5; j++) {
        // horizontal rows
        for (let x = 0; x < 5; x++) {
          let tmp_row_hor = [];
          let tmp_row_vert = [];

          for (let y = 0; y < 5; y++) {
            tmp_row_hor.push(data2[1 + j * 5 + x][y]);
            tmp_row_vert.push(data2[1 + j * 5 + y][x]);
          }

          if (tmp_row_hor.every((a) => picked.has(a)) || tmp_row_vert.every((a) => picked.has(a))) {
            let sumOfUnpicked = 0;
            for (let o = 0; o < 5; o++) {
              for (let m = 0; m < 5; m++) {
                if (!picked.has(data2[1 + j * 5 + o][m])) {
                  sumOfUnpicked += data2[1 + j * 5 + o][m];
                }
              }
            }

            let lastNumber = data2[0][i - 1];
            const res = lastNumber * sumOfUnpicked;
            if (shouldBreak) {
              if (!wins.includes(j)) {
                scores[j] = res;
                wins.push(j);
              }

              break;
            }

            console.log(res);
            shouldBreak = true;
            break;
          }
        }
      }
    }

    const lastWinIndex = wins[wins.length - 1];
    console.log(scores[lastWinIndex]);
  }
})();
