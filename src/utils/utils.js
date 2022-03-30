// 兼容复制操作
export function utilsCopy(tool_dom, text) {
  let textarea = document.createElement("textarea"); //创建input对象
  let current_focus = document.activeElement; //当前获得焦点的元素
  let tool_div = document.getElementById(tool_dom); //将文本框插入到工具dom节点之后
  tool_div.appendChild(textarea); //添加元素
  textarea.value = text;
  textarea.focus();
  if (textarea.setSelectionRange) {
    textarea.setSelectionRange(0, textarea.value.length); //获取光标起始位置到结束位置
  } else {
    textarea.select();
  }
  let flag;
  try {
    flag = document.execCommand("copy"); //执行复制
  } catch (error) {
    flag = false;
  }
  tool_div.removeChild(textarea); //删除元素
  current_focus.focus();
  return flag;
}
