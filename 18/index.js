import { loadData } from "../shared/index.js";

let inputFiles = undefined;
inputFiles = [
  // ["test", ["[[[0,[4,5]],[0,0]],[[[4,5],[2,6]],[9,5]]]", "[7,[[[3,7],[4,3]],[[6,3],[8,8]]]]"]],
  // ["tmp", ["[1,2]", "[[3,4],5]"]],
  // ["tmp2", ["[[[[4,3],4],4],[7,[[8,4],9]]]", "[1,1]"]],
  // [
  //   "explode",
  //   [
  //     "[[[[[9,8],1],2],3],4]",
  //     "[7,[6,[5,[4,[3,2]]]]]",
  //     "[[6,[5,[4,[3,2]]]],1]",
  //     "[[3,[2,[1,[7,3]]]],[6,[5,[4,[3,2]]]]]",
  //     "[[3,[2,[8,0]]],[9,[5,[4,[3,2]]]]]",

  //     // "[[[0,[4,5]],[0,0]],[[[4,5],[2,6]],[9,5]]]",
  //   ],
  // ],
  ["split", ["[[[[[4,3],4],4],[7,[[8,4],9]]],[1,1]]"]],
];

inputFiles = undefined;

(async () => {
  for (const [name, data] of await loadData(
    import.meta.url,
    // (row) => JSON.parse(row),
    (a) => a.split(""),
    inputFiles
  )) {
    console.log(`------------- ${name} -------------`);
    if (name !== "input.txt") {
      continue;
    }

    const explode = (arr) => {
      let count = 0;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] === "[") {
          count++;
          continue;
        } else if (arr[i] === "]") {
          count--;
          continue;
        }

        if (count === 5) {
          const tillNext = arr.slice(i, i + arr.slice(i).indexOf("]"));
          const [a, , b] = tillNext;

          for (let j = i - 1; j >= 0; j--) {
            if (!Number.isNaN(parseInt(arr[j]))) {
              arr[j] = (parseInt(arr[j]) + parseInt(a)).toString();
              break;
            }
          }
          for (let j = i + 3; j < arr.length; j++) {
            if (!Number.isNaN(parseInt(arr[j]))) {
              arr[j] = (parseInt(arr[j]) + parseInt(b)).toString();
              break;
            }
          }

          arr.splice(i - 1, tillNext.length + 2, "0");

          return true;
        }
      }

      return false;
    };

    const split = (arr) => {
      for (let i = 0; i < arr.length; i++) {
        const num = parseInt(arr[i]);
        if (!Number.isNaN(num) && num > 9) {
          const items = ["[", Math.floor(num / 2), ",", Math.ceil(num / 2), "]"];

          if (![",", "]"].includes(arr[i + 1])) {
            items.push(",");
          }

          arr.splice(i, 1, ...items);
          return true;
        }
      }

      return false;
    };

    const add = (a, b) => {
      return `[${a},${b}]`;
    };

    const reduce = (arr) => {
      let a = true;
      while (a) {
        a = explode(arr) || split(arr);
      }
    };

    let tmp = data[0];
    for (let i = 1; i < data.length; i++) {
      tmp = add(tmp.join(""), data[i].join("")).split("");
      reduce(tmp);
    }

    const final = JSON.parse(tmp.join(""));
    const rek = (arr) => {
      if (Array.isArray(arr)) {
        return rek(arr[0]) * 3 + rek(arr[1]) * 2;
      }
      return arr;
    };

    console.log("First", rek(final));

    let max = -1;
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data.length; j++) {
        if (i === j) {
          continue;
        }

        const tmp = add(data[i].join(""), data[j].join("")).split("");
        reduce(tmp);

        const res = JSON.parse(tmp.join(""));
        const localMax = rek(res);
        if (localMax > max) {
          max = localMax;
        }
      }
    }

    console.log("Second", max);
  }
})();

// [[[[0,7],4],[[7,8],[0,[6,7]]],[1,1]]
