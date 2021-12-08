import { loadData } from "../shared/index.js";

const dict = {
  // 0: "abcefg",
  1: "cf",
  // 2: "acdeg",
  // 3: "acdfg",
  4: "bcdf",
  // 5: "abdfg",
  // 6: "abdefg",
  7: "acf",
  8: "abcdefg",
  // 9: "abcdfg",
};

const fullDict = {
  0: "abcefg",
  1: "cf",
  2: "acdeg",
  3: "acdfg",
  4: "bcdf",
  5: "abdfg",
  6: "abdefg",
  7: "acf",
  8: "abcdefg",
  9: "abcdfg",
};

(async () => {
  for (const [name, data] of await loadData(import.meta.url, (row) => {
    return row.split(" ");
  })) {
    console.log(`------------- ${name} -------------`);
    console.log(data.length);

    // if (name !== "input3.txt") {
    //   continue;
    // }

    let count = 0;
    let values = [];
    for (const line of data) {
      const tmp = {};

      for (let i = 0; i < 10; i++) {
        let foo = -1;

        for (let j = 0; j < 10; j++) {
          if (dict[j] && dict[j].length === line[i].length) {
            foo = j;
            break;
          }
        }

        if (foo === -1) {
          continue;
        }

        tmp[foo] = line[i];
      }

      for (let i = 11; i < 15; i++) {
        if (
          Object.values(tmp)
            .map((a) => a.split("").sort().join(""))
            .includes(line[i].split("").sort().join(""))
        ) {
          count++;
        }
      }

      console.log(tmp);

      // const mapping = {
      //   a: tmp["7"].split("").filter((a) => !tmp["1"].includes(a)),
      // };

      // const numMap = {
      //   9: [...new Set([...tmp["7"].split(""), ...tmp["4"].split("")])]
      //     .sort()
      //     .join(""),
      // };

      let letters = ["a", "b", "c", "d", "e", "f", "g"];

      console.log(tmp);

      const possibleOptions = [];
      for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 7; j++) {
          for (let k = 0; k < 7; k++) {
            for (let o = 0; o < 7; o++) {
              for (let m = 0; m < 7; m++) {
                for (let l = 0; l < 7; l++) {
                  for (let e = 0; e < 7; e++) {
                    const arr = [i, j, k, o, m, l, e];
                    if (new Set(arr).size != 7) {
                      continue;
                    }

                    const option = arr.map((iter) => letters[iter]).join("");

                    let all = true;
                    for (const [num, set] of Object.entries(tmp)) {
                      let foo = "";
                      for (const letter of dict[num]) {
                        foo += option[letters.indexOf(letter)];
                      }

                      if (num === "8") {
                        if (foo.length === set.length) {
                          continue;
                        }
                      }

                      if (
                        set.split("").sort().join("") !==
                        foo.split("").sort().join("")
                      ) {
                        all = false;
                        break;
                      }
                    }

                    if (all) {
                      possibleOptions.push(option);
                    }
                  }
                }
              }
            }
          }
        }
      }

      for (const opt of possibleOptions) {
        const all = [];
        for (let i = 0; i < 15; i++) {
          if (i === 10) {
            continue;
          }

          const full = line[i]
            .split("")
            .map((letter) => letters[opt.indexOf(letter)])
            .sort()
            .join("");

          for (const [key, value] of Object.entries(fullDict)) {
            if (value === full) {
              all.push(key);
              break;
            }
          }
        }

        if (all.length === 14) {
          values.push(parseInt(all.slice(10).join("")));
          break;
        }
      }
    }

    console.log(values.reduce((sum, a) => sum + a, 0));
    console.log(count);
  }
})();
