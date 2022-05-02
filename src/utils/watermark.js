// 添加水印方法
export function watermark(CON, H, W, R, C, S, O) {
  // 判断水印是否存在，如果存在，那么不执行
  if (document.getElementById("watermark") != null) {
    return;
  }
  var Line = parseInt(document.body.clientWidth / W) * 2; // 一行显示几列
  var StrLine = "";
  for (let i = 0; i < Line; i++) {
    StrLine +=
      '<span style="display: inline-block; line-height:' +
      H +
      "px; width:" +
      W +
      "px; text-align: center; transform:rotate(" +
      R +
      "deg); color:" +
      C +
      "; font-size:" +
      S +
      "px; opacity:" +
      O +
      ';">' +
      CON +
      "</span>";
  }
  var DivLine = document.createElement("div");
  DivLine.innerHTML = StrLine;
  var Column = parseInt(document.body.clientHeight / H) * 2; // 一列显示几行
  let StrColumn = "";
  for (let i = 0; i < Column; i++) {
    StrColumn +=
      '<div style="white-space: nowrap;">' + DivLine.innerHTML + "</div>";
  }
  var DivLayer = document.createElement("div");
  DivLayer.id = "watermark"; // 给水印盒子添加类名
  DivLayer.style.position = "fixed";
  DivLayer.style.top = "0px"; // 整体水印距离顶部距离
  DivLayer.style.left = "-100px"; // 改变整体水印的left值
  DivLayer.style.zIndex = "99999"; // 水印页面层级
  DivLayer.style.pointerEvents = "none";
  DivLayer.innerHTML = StrColumn;

  document.body.appendChild(DivLayer); // 到页面中
}

// 移除水印方法
export function Rmwatermark() {
  // 判断水印是否存在，如果存在，那么执行
  if (document.getElementById("watermark") == null) {
    return;
  }
  document.body.removeChild(document.getElementById("watermark"));
}
