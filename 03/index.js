import { loadData } from "../shared/index.js";

(async () => {
  for (const data of await loadData(import.meta.url, (row) => {
    return row;
  })) {
    console.log("-------------");

    let a = data[0].split("").map((a) => 0);

    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].length; j++) {
        a[j] += data[i][j] === "0" ? 0 : 1;
      }
    }

    const most_common = parseInt(a.map((i) => (i > data.length / 2 ? "1" : "0")).join(""), 2);
    const least_common = parseInt(a.map((i) => (i < data.length / 2 ? "1" : "0")).join(""), 2);
    console.log(most_common * least_common);

    let tmp = [...data];
    let tmp2 = [...data];
    for (let i = 0; i < data[0].length; i++) {
      if (tmp.length > 1) {
        tmp = tmp.filter((row) => {
          let len = tmp.filter((row2) => row2[i] === "1");
          let compare = len.length >= tmp.length / 2 ? "1" : "0";

          return row[i] === compare;
        });
      }

      if (tmp2.length > 1) {
        tmp2 = tmp2.filter((row) => {
          let len = tmp2.filter((row2) => row2[i] === "1");
          let compare = len.length >= tmp2.length / 2 ? "0" : "1";

          return row[i] === compare;
        });
      }
    }

    // console.log(tmp[0], tmp2[0]);
    const x = parseInt(tmp[0], 2);
    const y = parseInt(tmp2[0], 2);
    console.log(x * y);
  }
})();
