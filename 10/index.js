import { loadData } from "../shared/index.js";

(async () => {
  for (const [name, data] of await loadData(import.meta.url, (row) => {
    return row.split("");
  })) {
    console.log(`------------- ${name} -------------`);
    // if (name === "input.txt") {
    //   continue;
    // }

    const closing = [")", "}", "]", ">"];
    const opposite = { "(": ")", "{": "}", "[": "]", "<": ">" };
    const errMap = { ")": 3, "]": 57, "}": 1197, ">": 25137 };

    const err = [];
    const corrFix = [];
    for (const line of data) {
      const stack = [];
      let corrupted = false;

      for (const char of line) {
        if (stack.length === 0) {
          stack.push(char);
        } else {
          const last = stack[stack.length - 1];
          if (closing.includes(char) && opposite[last] !== char) {
            err.push(errMap[char]);
            corrupted = true;
            break;
          } else {
            if (closing.includes(char)) {
              stack.pop();
            } else {
              stack.push(char);
            }
          }
        }
      }

      const corruptedMap = { ")": 1, "]": 2, "}": 3, ">": 4 };
      if (!corrupted) {
        let corrTmp = 0;
        for (const char of stack.slice().reverse()) {
          corrTmp *= 5;
          corrTmp += corruptedMap[opposite[char]];
        }
        corrFix.push(corrTmp);
      }
    }

    console.log(err.reduce((a, b) => a + b, 0));
    console.log("---- part-2 ----");
    console.log(corrFix.slice().sort((a, b) => a - b)[Math.floor(corrFix.length / 2)]);
  }
})();
