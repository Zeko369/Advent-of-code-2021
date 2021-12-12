import { loadData } from "../shared/index.js";

(async () => {
  for (const [name, data] of await loadData(import.meta.url, (row) => {
    return row.split("-");
  })) {
    console.log(`------------- ${name} -------------`);
    // if (name === "input.txt") {
    //   console.log("Skip");
    //   continue;
    // }

    const obj = {};
    for (const [key, value] of data) {
      if (!obj[key]) {
        obj[key] = new Set();
      }

      if (!obj[value]) {
        obj[value] = new Set();
      }

      obj[key].add(value);
      obj[value].add(key);
    }

    const isLower = (opts) => {
      return opts === opts.toLowerCase();
    };

    const queue = [["start"]];
    let possiblePaths = [];
    while (queue.length) {
      const path = queue.splice(0, 1)[0];
      const last = path[path.length - 1];

      if (last === "end") {
        possiblePaths.push([...path].join("-"));
      }

      for (const opts of obj[last]) {
        if ((path.includes(opts) && isLower(opts)) || opts === "start") {
          continue;
        }

        queue.push([...path, opts]);
      }
    }

    console.log("Part1", possiblePaths.length);

    possiblePaths = new Set();
    Object.keys(obj)
      .filter(isLower)
      .filter((key) => !["start", "end"].includes(key))
      .forEach((key) => {
        console.log("key", key);

        const queue = [{ p: ["start"], u: false }];
        while (queue.length) {
          const elem = queue.splice(0, 1)[0];
          const path = elem.p;
          const last = path[path.length - 1];

          if (last === "end") {
            possiblePaths.add([...path].join("-"));
          }

          for (const opts of obj[last]) {
            if (
              (path.includes(opts) && isLower(opts) && (opts === key ? elem.u : true)) ||
              opts === "start"
            ) {
              continue;
            }

            let tmp = elem.u;
            if (path.includes(opts) && isLower(opts) && opts === key && !tmp) {
              tmp = true;
            }

            queue.push({ p: [...path, opts], u: tmp });
          }
        }
      });

    console.log("Part2", possiblePaths.size);
  }
})();
