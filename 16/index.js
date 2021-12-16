import { loadData } from "../shared/index.js";

(async () => {
  for (const [name, rows] of await loadData(import.meta.url, (row, index) => {
    return row
      .split("")
      .map((a) => parseInt(a, 16).toString(2))
      .map((a) => {
        if (a.length < 4) {
          return "0".repeat(4 - a.length) + a;
        }
        return a;
      })
      .join("");
  })) {
    console.log(`------------- ${name} -------------`);
    if (name !== "tmp-0") {
      continue;
    }

    // if (name > "input5.txt") {
    //   break;
    // }

    // if (name !== "input3.txt") {
    //   continue;
    // }

    const parseHeader = (str) => {
      const version = parseInt(str.slice(0, 3), 2);
      const id = str.slice(3, 6);

      return [version, id];
    };

    const parseLiteral = (str) => {
      let num = "";
      let i = 0;
      while (true) {
        const tmp = str.slice(i, i + 5);
        if (tmp.length !== 5) {
          break;
        }

        num += tmp.slice(1);

        if (tmp[0] == "0") {
          i += 5;
          break;
        }

        i += 5;
      }

      const val = parseInt(num, 2);
      return [val, i];
    };

    const parseOperator = (str) => {
      const mode = str[0];
      let cursor = 1;
      const sub = [];

      if (mode === "0") {
        // length 15
        const len = parseInt(str.slice(cursor, cursor + 15), 2);
        cursor += 15;

        for (let i = 0; i < len && cursor < str.length; i += 6) {
          const rest = str.slice(cursor);
          if (rest.length < 6 + 5) {
            break;
          }

          const [version, id] = parseHeader(rest);
          console.log(version, id);

          cursor += 6;
          if (id === "100") {
            const [num, offset] = parseLiteral(str.slice(cursor));
            i += offset;
            cursor += offset;

            sub.push({ type: "literal", version, data: num });
          } else {
            const [operator, c] = parseOperator(str.slice(cursor));
            i += c;
            cursor += c;
            sub.push({ type: "operator", version, data: operator });
          }
        }
      } else {
        // number of sub-packets
        const len = parseInt(str.slice(cursor, cursor + 11), 2);
        console.log(len);

        cursor += 11;
        for (let i = 0; i < len && cursor < str.length; i++) {
          const [version, id] = parseHeader(str.slice(cursor));
          cursor += 6;
          if (id === "100") {
            const [num, offset] = parseLiteral(str.slice(cursor));
            cursor += offset;
            sub.push({ type: "literal", version, data: num });
          } else {
            const [operator, c] = parseOperator(str.slice(cursor));
            cursor += c;
            sub.push({ type: "operator", version, data: operator });
          }
        }
      }

      return [sub, cursor];
    };

    const data = rows[0];
    console.log(data);
    if (parseHeader(data)[1] === "100") {
      const [num, offset] = parseLiteral(data.slice(6));
      console.log(num);
    } else {
      const [op] = parseOperator(data.slice(6));
      const final = {
        type: "operator",
        version: parseHeader(data)[0],
        data: op,
      };

      console.log(JSON.stringify(final, null, 2));

      const getVersionSum = (foo, v) => {
        if (Array.isArray(foo.data)) {
          return (
            foo.data.reduce((acc, cur) => {
              return acc + getVersionSum(cur, v);
            }, 0) +
            foo.version +
            v
          );
        }

        return v + (foo.version || 0);
      };

      console.log(getVersionSum(final, 0));

      const evals = {
        0: (args) => args.reduce((acc, cur) => acc + cur, 0),
        1: (args) => args.reduce((acc, cur) => acc * cur, 1),
        2: (args) => args.sort((a, b) => a - b)[1],
        3: (args) => args.sort((a, b) => b - a)[1],
        5: ([a, b]) => (a > b ? 1 : 0),
        6: ([a, b]) => (a < b ? 1 : 0),
        7: ([a, b]) => (a === b ? 1 : 0),
      };
    }
  }
})();
