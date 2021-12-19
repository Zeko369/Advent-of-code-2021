import { loadData } from "../shared/index.js";

let inputFiles = undefined;
inputFiles = [
  ["test", ["[[[0,[4,5]],[0,0]],[[[4,5],[2,6]],[9,5]]]", "[7,[[[3,7],[4,3]],[[6,3],[8,8]]]]"]],
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
  //   ],
  // ],
  // ["split", ["[[[[0,7],4],[15,[0,13]]],[1,1]]"]],
];

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

    const explode = (row) => {
      const req = (tree, p = [], depth = 0) => {
        if (depth === 4) {
          const [p0, p1, p2, p3] = p;

          if (p3 === 0) {
            // remove and add right
            console.log("TUUUUUUUUUU", row[p0][p1][p2]);

            row[p0][p1][p2][1] += tree[1];
            row[p0][p1][p2][0] = 0;

            const tmp = JSON.parse(JSON.stringify(row));
            tmp[p0][p1][p2] = "A";
            let t = JSON.stringify(tmp);

            console.log("---------------------");
            console.log(t);

            for (let k = t.length - 1; k >= 0; k--) {
              if (t[k] === "A") {
                let done = false;
                for (let i = k; i >= 0; i--) {
                  if (!Number.isNaN(parseInt(t[i]))) {
                    done = true;
                    t = t
                      .split("")
                      .map((a, ii) => {
                        if (ii === i) {
                          return '"B"';
                        }
                        return a;
                      })
                      .join("");
                    break;
                  }
                }

                if (done) {
                  break;
                }
              }
            }

            const tmp2 = JSON.parse(t);
            const tmp3 = JSON.parse(t);
            const rek = (a, p = []) => {
              if (a === "B") {
                const [p0, p1, p2, p3] = p;
                if (p3 === undefined) {
                  if (p2 === undefined) {
                    if (p1 === undefined) {
                      tmp3[p0] = row[p0] + tree[0];
                    } else {
                      tmp3[p0][p1] = row[p0][p1] + tree[0];
                    }
                  } else {
                    tmp3[p0][p1][p2] = row[p0][p1][p2] + tree[0];
                  }
                } else {
                  tmp3[p0][p1][p2][p3] = row[p0][p1][p2][p3] + tree[0];
                }
              }

              if (Array.isArray(a)) {
                a.forEach((item, index) => {
                  rek(item, [...p, index]);
                });
              }
            };

            rek(tmp2);
            let foo = JSON.stringify(tmp3);

            console.log("TUUUUUUUUUU", row[p0][p1][p2]);

            foo = foo.replace('"A"', JSON.stringify(row[p0][p1][p2]));
            row = JSON.parse(foo);
          } else {
            row[p0][p1][p2][0] += tree[0];
            row[p0][p1][p2][1] = 0;

            const tmp = JSON.parse(JSON.stringify(row));
            tmp[p0][p1][p2] = "A";
            let t = JSON.stringify(tmp);

            for (let k = 0; k < t.length; k++) {
              if (t[k] === "A") {
                let done = false;
                for (let i = k; i < t.length; i++) {
                  if (!Number.isNaN(parseInt(t[i]))) {
                    done = true;
                    t = t
                      .split("")
                      .map((a, ii) => {
                        if (ii === i) {
                          return '"B"';
                        }
                        return a;
                      })
                      .join("");
                    break;
                  }
                }

                if (done) {
                  break;
                }
              }
            }

            const tmp2 = JSON.parse(t);
            const tmp3 = JSON.parse(t);
            const rek = (a, p = []) => {
              if (a === "B") {
                const [p0, p1, p2, p3] = p;
                if (p3 === undefined) {
                  if (p2 === undefined) {
                    if (p1 === undefined) {
                      tmp3[p0] = row[p0] + tree[1];
                    } else {
                      tmp3[p0][p1] = row[p0][p1] + tree[1];
                    }
                  } else {
                    tmp3[p0][p1][p2] = row[p0][p1][p2] + tree[1];
                  }
                } else {
                  tmp3[p0][p1][p2][p3] = row[p0][p1][p2][p3] + tree[1];
                }
              }

              if (Array.isArray(a)) {
                a.forEach((item, index) => {
                  rek(item, [...p, index]);
                });
              }
            };

            rek(tmp2);
            let foo = JSON.stringify(tmp3);

            foo = foo.replace('"A"', JSON.stringify(row[p0][p1][p2]));
            row = JSON.parse(foo);
          }

          throw "done";
        }

        tree.forEach((item, index) => {
          if (Array.isArray(item)) {
            req(item, [...p, index], depth + 1);
          }
        });
      };

      try {
        return req(row, [], 0);
      } catch (e) {
        if (e === "done") {
          return;
        }
        throw e;
      }
    };

    const split = (row) => {
      const req = (tree, p = [], depth = 0) => {
        if (tree[0] > 9) {
          tree[0] = [Math.floor(tree[0] / 2), Math.ceil(tree[0] / 2)];
          throw "done";
        } else if (tree[1] > 9) {
          tree[1] = [Math.floor(tree[1] / 2), Math.ceil(tree[1] / 2)];
          throw "done";
        }

        tree.forEach((item, index) => {
          if (Array.isArray(item)) {
            req(item, [...p, index], depth + 1);
          }
        });
      };

      try {
        return req(row, [], 0);
      } catch (e) {
        if (e === "done") {
          return;
        }
        throw e;
      }
    };

    const reduce = (row) => {
      let before = "";
      while (before !== JSON.stringify(row)) {
        before = JSON.stringify(row);

        explode(row);
        console.log("explode", JSON.stringify(row));
        split(row);
        console.log("split  ", JSON.stringify(row));
      }
    };

    const add = (a, b) => [a, b];
    let tmp = data[0];
    for (let i = 1; i < data.length; i++) {
      // reduce(tmp);
      // reduce(data[i]);
      tmp = add(tmp, data[i]);
    }

    console.log("------");
    reduce(tmp);

    console.log(JSON.stringify(tmp));
  }
})();
