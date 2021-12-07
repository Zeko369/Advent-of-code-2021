import { loadData } from "../shared/index.js";

(async () => {
  for (const [name, allData] of await loadData(import.meta.url, (row) => {
    return row.split(",").map((a) => parseInt(a));
  })) {
    console.log(`------------- ${name} -------------`);

    /** @type {number[]} */
    const data = allData[0];
    console.log(data.length);

    let min = 100000000;
    let min2 = 100000000;
    for (let i = 0; i < data.length; i++) {
      let tmp = 0;
      let tmp2 = 0;

      for (let j = 0; j < data.length; j++) {
        if (data[j] !== i) {
          tmp += Math.abs(i - data[j]);
          // tmp2 += Math.abs(i - data[j]) * moves;
          let moves = 1;
          for (let k = 0; k < Math.abs(i - data[j]); k++) {
            tmp2 += moves++;
          }
        }
      }

      if (tmp < min) {
        min = tmp;
      }

      if (tmp2 < min2) {
        min2 = tmp2;
      }
    }

    console.log("1", min);
    console.log("2", min2);
  }
})();
