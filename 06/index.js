import { loadData } from "../shared/index.js";

(async () => {
  for (const [name, allData] of await loadData(import.meta.url, (row) => {
    return row.split(",").map((a) => parseInt(a));
  })) {
    // if (name === "input.txt") {
    //   continue;
    // }

    console.log(`------------- ${name} -------------`);
    /** @type {number[]} */
    const data = allData[0].slice();

    for (let i = 0; i < 80; i++) {
      const currLen = data.length;
      for (let j = 0; j < currLen; j++) {
        if (data[j] === 0) {
          data[j] = 6;
          data.push(8);
        } else {
          data[j]--;
        }
      }
    }

    console.log(1, data.length);

    let mods = new Array(9).fill(0);
    allData[0].slice().forEach((value) => mods[value % 6]++);
    for (let i = 0; i < 256; i++) {
      const firstVal = mods[0];
      mods = mods.slice(1);
      mods[6] += firstVal;
      mods[8] = firstVal;
    }

    console.log(
      2,
      mods.reduce((a, b) => a + b, 0)
    );
  }
})();
