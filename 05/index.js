import { loadData } from "../shared/index.js";

(async () => {
  for (const [name, data] of await loadData(import.meta.url, (row) => {
    const [a, b] = row.split(" -> ");
    const [a1, a2] = a.split(",").map((i) => parseInt(i));
    const [b1, b2] = b.split(",").map((i) => parseInt(i));

    return [a1, a2, b1, b2];
  })) {
    console.log(`------------- ${name} -------------`);
    const max = Math.max(...data.map(([a1, a2, b1, b2]) => Math.max(a1, a2, b1, b2)));
    console.log(max);

    // if (name === "input.txt") {
    //   continue;
    // }

    const arr = Array.from(new Array(max + 1), () => Array.from(new Array(max + 1), () => 0));

    const sol = [
      "1.1....11.",
      ".111...2..",
      "..2.1.111.",
      "...1.2.2..",
      ".112313211",
      "...1.2....",
      "..1...1...",
      ".1.....1..",
      "1.......1.",
      "222111....",
    ];

    const print = () => {
      // for (let i = 0; i <= max; i++) {
      //   for (let j = 0; j <= max; j++) {
      //     // if (i === 4 && j === 6) {
      //     // process.stdout.write("*");
      //     // } else if (i === 0 && j === 2) {
      //     // process.stdout.write("*");
      //     // } else {
      //     process.stdout.write((arr[i][j] || ".").toString());
      //     // }
      //   }
      //   process.stdout.write("  ");
      //   process.stdout.write(sol[i]);
      //   process.stdout.write("\n");
      // }
    };

    for (const [a1, a2, b1, b2] of data) {
      if (a1 === b1) {
        for (let i = Math.min(a2, b2); i <= Math.max(a2, b2); i++) {
          arr[i][a1]++;
        }
      } else if (a2 === b2) {
        for (let i = Math.min(a1, b1); i <= Math.max(a1, b1); i++) {
          arr[a2][i]++;
        }
      } else {
        if (a1 > b1) {
          const left = b2 > a2;
          for (let i = a1; i >= b1; i--) {
            const index = a1 - i;
            arr[Math.min(a2, b2) + index][left ? i : index + Math.min(a1, b1)]++;
          }
        } else if (a1 === a2 && b1 === b2) {
          for (let i = Math.min(a1, b1); i <= Math.max(a2, b2); i++) {
            arr[i][i]++;
          }
        } else {
          const left = b2 < a2;
          for (let i = b1; i >= a1; i--) {
            const index = b1 - i;
            arr[Math.min(a2, b2) + index][left ? i : index + Math.min(a1, b1)]++;
          }
        }
      }
    }

    print();

    let overlaps = 0;
    arr.forEach((row) => {
      row.forEach((v) => {
        if (v > 1) {
          overlaps++;
        }
      });
    });
    console.log(overlaps);
  }
})();
