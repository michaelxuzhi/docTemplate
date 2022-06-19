// 抽卡概率计算
// let reData = [
//   { id: "blue", rate: 699 },
//   { id: "purple", rate: 300 },
//   { id: "gold", rate: 100 },
// ];
export function randomRate(reData) {
  let { sortedArr, o } = sortOriginArr(reData); // 原始权重排序
  let cur_pro = parseInt(Math.random() * o[o.length - 1]);
  let res = [];
  Object.entries(sortedArr).map((ele) => {
    if (res.length) return;
    cur_pro <= ele[1].rate ? res.push(ele[1].id) : {};
  });
  //   console.log(cur_pro, res);
  return res[0];
}

function sortOriginArr(arr) {
  let o = [];
  let sortedArr = arr.sort((a, b) => {
    return a.rate - b.rate;
  });
  sortedArr.forEach((ele) => {
    o.push(ele.rate);
  });
  return { sortedArr, o };
}

// randomRate(reData);
