import { loadData } from "../shared/index.js";

let inputFiles = undefined;
inputFiles = [
  ["test", ["[[[0,[4,5]],[0,0]],[[[4,5],[2,6]],[9,5]]]", "[7,[[[3,7],[4,3]],[[6,3],[8,8]]]]"]],
  // ["tmp", ["[1,2]", "[[3,4],5]"]],
  // ["tmp2", ["[[[[4,3],4],4],[7,[[8,4],9]]]", "[1,1]"]],
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

    const converter = (array) => {
      const tree = [];
      const convert = (arr, depth, key) => {
        arr.forEach((item, index) => {
          if (Array.isArray(item)) {
            convert(item, depth + 1, `${key}-${index}-${depth}`);
          } else {
            tree.push({ item, depth, key });
          }
        });
      };
      convert(array, 0, "root");
      return tree;
    };

    const explode = (tree) => {
      for (let i = 0; i < tree.length; i++) {
        if (tree[i].depth >= 4) {
          const a = tree[i];
          const b = tree[i + 1];

          if (tree[i - 1]) {
            tree[i - 1].item += a.item;
            tree[i].depth--;
            tree[i].item = 0;

            if (tree[i + 2]) {
              tree[i + 2].item += b.item;
            }

            tree.splice(i + 1, 1);
          } else {
            tree[i + 2].item += b.item;
            tree[i + 1].item = 0;
            tree[i + 1].depth--;

            if (tree[i - 1]) {
              tree[i - 1].item += a.item;
            }

            tree.splice(i, 1);
          }

          return;
        }
      }
    };

    const canExplode = (tree) => {
      return tree.some((a) => a.depth >= 4);
    };

    const split = (tree) => {
      for (let i = 0; i < tree.length; i++) {
        if (tree[i].item > 9) {
          const a = Math.floor(tree[i].item / 2);
          const b = Math.ceil(tree[i].item / 2);

          tree[i].item = a;
          tree[i].depth++;
          tree.splice(i + 1, 0, { item: b, depth: tree[i].depth });
          return;
        }
      }
    };

    const canSplit = (tree) => {
      return tree.some((a) => a.item > 9);
    };

    const reduce = (tree) => {
      while (canExplode(tree) || canSplit(tree)) {
        if (canExplode(tree)) {
          explode(tree);
        }

        if (canSplit(tree)) {
          split(tree);
        }
      }
    };

    const add = (a, b) => {
      return [
        ...a.map((x) => ({ ...x, depth: x.depth + 1 })),
        ...b.map((x) => ({ ...x, depth: x.depth + 1 })),
      ];
    };

    const trees = [];
    for (let i = 0; i < data.length; i++) {
      trees.push(converter(data[i]).map((a) => ({ ...a, key: `${i}|${a.key}` })));
    }

    let tmp = trees[0];
    for (let i = 1; i < trees.length; i++) {
      const other = trees[i];

      reduce(other);
      reduce(tmp);

      tmp = add(tmp, other);
      reduce(tmp);
    }

    console.log(tmp);

    // [[[[4,0],[5,4]],[[7,7],[6,0]]],[[8,[7,7]],[[7,9],[5,0]]]]
  }
})();
