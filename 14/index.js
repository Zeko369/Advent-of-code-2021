import { loadData } from "../shared/index.js";

(async () => {
  for (const [name, data] of await loadData(import.meta.url, (row, index) => {
    if (index === 0) {
      return row;
    }

    if (index === 1) {
      return;
    }

    return row.split(" -> ");
  })) {
    console.log(`------------- ${name} -------------`);
    // if (name === "input.txt") {
    //   continue;
    // }

    const first = data[0];
    const rows = Object.fromEntries(data.slice(2));

    let template = [...first];
    // OLD PART 1, not working for part2 (out of memory)
    // for (let i = 0; i < 10; i++) {
    //   const adds = [];
    //   for (let j = 0; j < template.length - 1; j++) {
    //     const key = template[j] + template[j + 1];
    //     if (rows[key]) {
    //       adds[j] = rows[key];
    //     }
    //   }

    //   const newTemplate = [];
    //   for (let j = 0; j < template.length; j++) {
    //     newTemplate.push(template[j]);
    //     if (adds[j]) {
    //       newTemplate.push(adds[j]);
    //     }
    //   }

    //   template = newTemplate;
    // }

    // const elements = {};
    // for (let i = 0; i < template.length; i++) {
    //   if (!elements[template[i]]) {
    //     elements[template[i]] = 0;
    //   }

    //   elements[template[i]]++;
    // }

    const part2 = {};
    template = [...first];
    const letters = {};
    for (let i = 0; i < template.length; i++) {
      if (!letters[template[i]]) {
        letters[template[i]] = 0;
      }
      letters[template[i]]++;

      if (i === template.length - 1) {
        continue;
      }

      const key = template[i] + template[i + 1];
      if (!part2[key]) {
        part2[key] = 0;
      }
      part2[key]++;
    }

    for (let i = 0; i < 40; i++) {
      const keys = Object.keys(part2);
      const newKeys = {};
      const remove = [];

      for (let j = 0; j < keys.length; j++) {
        const key = keys[j];

        if (rows[key]) {
          if (!letters[rows[key]]) {
            letters[rows[key]] = 0;
          }

          letters[rows[key]] += part2[key];
          remove.push(key);
          [key[0] + rows[key], rows[key] + key[1]].forEach((k) => {
            if (!newKeys[k]) {
              newKeys[k] = 0;
            }
            newKeys[k] += part2[key];
          });
        }
      }

      remove.forEach((key) => delete part2[key]);
      Object.entries(newKeys).forEach(([key, value]) => {
        if (!part2[key]) {
          part2[key] = 0;
        }

        part2[key] += value;
      });

      // first part
      if (i === 9) {
        const result = Object.entries(letters).sort((a, b) => b[1] - a[1]);
        console.log("Part1", result[0][1] - result[result.length - 1][1]);
      }
    }

    const result2 = Object.entries(letters).sort((a, b) => b[1] - a[1]);
    console.log("Part2", result2[0][1] - result2[result2.length - 1][1]);
  }
})();
