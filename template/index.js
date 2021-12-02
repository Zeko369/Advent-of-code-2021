import { loadData } from "../shared/index.js";

(async () => {
  for (const data of await loadData(import.meta.url, (row) => {
    const [a, b] = row.split(" ");
    return [a, parseInt(b)];
  })) {
    console.log(data);
  }
})();
