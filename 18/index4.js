import { loadData } from "../shared/index.js";

let inputFiles = undefined;
inputFiles = [
  // ["test", ["[[[0,[4,5]],[0,0]],[[[4,5],[2,6]],[9,5]]]", "[7,[[[3,7],[4,3]],[[6,3],[8,8]]]]"]],
  // ["tmp", ["[1,2]", "[[3,4],5]"]],
  // ["tmp2", ["[[[[4,3],4],4],[7,[[8,4],9]]]", "[1,1]"]],
  [
    "explode",
    [
      //     "[[[[[9,8],1],2],3],4]",
      //     "[7,[6,[5,[4,[3,2]]]]]",
      //     "[[6,[5,[4,[3,2]]]],1]",
      //     "[[3,[2,[1,[7,3]]]],[6,[5,[4,[3,2]]]]]",
      //     "[[3,[2,[8,0]]],[9,[5,[4,[3,2]]]]]",

      "[[[0,[4,5]],[0,0]],[[[4,5],[2,6]],[9,5]]]",
    ],
  ],
  //   ["split", ["[[[[0,7],4],[15,[0,13]]],[1,1]]"]],
];

inputFiles = undefined;

(async () => {
  for (const [name, data] of await loadData(
    import.meta.url,
    (row) => JSON.parse(row),
    inputFiles
  )) {
    console.log(`------------- ${name} -------------`);
    if (name === "input.txt") {
      continue;
    }

    // const explode = (arr) => {
    //   for (let i = 0; i < arr.length; i++) {
    //     if (!arr[i]) break;
    //     if (!Array.isArray(arr[i])) continue;

    //     for (let j = 0; j < arr[i].length; j++) {
    //       if (!arr[i][j]) break;
    //       if (!Array.isArray(arr[i][j])) continue;

    //       for (let k = 0; k < arr[i][j].length; k++) {
    //         if (!arr[i][j][k]) break;
    //         if (!Array.isArray(arr[i][j][k])) continue;

    //         for (let o = 0; o < arr[i][j][k].length; o++) {
    //           if (Array.isArray(arr[i][j][k][o])) {
    //             const [a, b] = arr[i][j][k][o];

    //             console.log("before", JSON.stringify(arr));
    //             arr[i][j][k][o] = "A";
    //             let tmp = JSON.stringify(arr);
    //             console.log("with-A", tmp);
    //             console.log(a, b);

    //             for (let i = tmp.indexOf("A"); i >= 0; i--) {
    //               if (!Number.isNaN(parseInt(tmp[i]))) {
    //                 let firstNonNum = [
    //                   tmp.slice(i).split("").reverse().indexOf(","),
    //                   tmp.slice(i).split("").reverse().indexOf("]"),
    //                   tmp.slice(i).split("").reverse().indexOf("["),
    //                 ]
    //                   .filter((a) => a !== -1)
    //                   .map((a) => a + i)
    //                   .sort((a, b) => a - b)[0];

    //                 console.log([firstNonNum, i, tmp.slice(firstNonNum, i + 1)]);

    //                 const tmpNum = parseInt(tmp.slice(firstNonNum, i + 1));
    //                 console.log(tmpNum + a);
    //                 const tmpArr = tmp.split("");
    //                 tmpArr.splice(firstNonNum, i + 1 - firstNonNum, ...`${tmpNum + a}`.split(""));
    //                 tmp = tmpArr.join("");

    //                 console.log(tmp);

    //                 break;
    //               }
    //             }

    //             for (let i = tmp.indexOf("A"); i <= tmp.length; i++) {
    //               if (!Number.isNaN(parseInt(tmp[i]))) {
    //                 let firstNonNum = [
    //                   tmp.slice(i).indexOf(","),
    //                   tmp.slice(i).indexOf("]"),
    //                   tmp.slice(i).indexOf("["),
    //                 ]
    //                   .filter((a) => a !== -1)
    //                   .map((a) => a + i)
    //                   .sort((a, b) => a - b)[0];

    //                 const tmpNum = parseInt(tmp.slice(i, firstNonNum));
    //                 const tmpArr = tmp.split("");
    //                 tmpArr.splice(i, firstNonNum - i, ...`${tmpNum + b}`.split(""));
    //                 tmp = tmpArr.join("");

    //                 break;
    //               }
    //             }

    //             JSON.parse(tmp).forEach((elem, i) => (arr[i] = elem));
    //             arr[i][j][k][o] = 0;

    //             return;
    //           }
    //         }
    //       }
    //     }
    //   }
    // };

    // const split = (arr) => {
    //   const req = (tree, p = [], depth = 0) => {
    //     if (tree[0] > 9) {
    //       tree[0] = [Math.floor(tree[0] / 2), Math.ceil(tree[0] / 2)];
    //       throw "done";
    //     } else if (tree[1] > 9) {
    //       tree[1] = [Math.floor(tree[1] / 2), Math.ceil(tree[1] / 2)];
    //       throw "done";
    //     }

    //     tree.forEach((item, index) => {
    //       if (Array.isArray(item)) {
    //         req(item, [...p, index], depth + 1);
    //       }
    //     });
    //   };

    //   try {
    //     return req(arr, [], 0);
    //   } catch (e) {
    //     if (e === "done") {
    //       return;
    //     }
    //     throw e;
    //   }
    // };

    // const reduce = (arr) => {
    //   let before = "";
    //   while (before !== JSON.stringify(arr)) {
    //     before = JSON.stringify(arr);
    //     if (before.includes("A")) {
    //       break;
    //     }

    //     explode(arr);
    //     split(arr);
    //   }

    //   return arr;
    // };

    // const add = (a, b) => [a, b];

    // const recursiveMaxDepth = (arr) => {
    //   let max = 0;
    //   arr.forEach((item) => {
    //     if (Array.isArray(item)) {
    //       max = Math.max(max, recursiveMaxDepth(item));
    //     }
    //   });
    //   return max + 1;
    // };

    let tmp = data[0].slice();
    for (let i = 1; i < data.length; i++) {
      // console.log(JSON.stringify(reduce(tmp)));
      // console.log(JSON.stringify(reduce(data[i])));
      // console.log("====");

      // console.log(recursiveMaxDepth(tmp), recursiveMaxDepth(data[i]));
      reduce(tmp);
      reduce(data[i]);
      tmp = add(tmp, data[i]);
      // console.log(recursiveMaxDepth(tmp));

      reduce(tmp);
      console.log(recursiveMaxDepth(tmp));

      console.log(JSON.stringify(tmp));
      console.log("-----------------------");
      console.log("[[[[4,0],[5,4]],[[7,7],[6,0]]],[[8,[7,7]],[[7,9],[5,0]]]]");

      break;
    }

    console.log(JSON.stringify(tmp));
    // console.log("---");
    // console.log("[[[[8,7],[7,7]],[[8,6],[7,7]]],[[[0,7],[6,6]],[8,7]]]");
  }
})();
