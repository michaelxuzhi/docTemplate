// 全局通知控件
import { ElNotification } from "element-plus";
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

export function utilsNotice(type, title, text) {
  return ElNotification({
    title: title,
    message: text,
    type: type,
    duration: 2000,
    offset: 80,
  });
}

export function utilsArrayDel(arr, ele) {
  let eleIndex = arr.indexOf(ele);
  if (eleIndex !== -1) {
    arr.splice(eleIndex, 1);
    return arr;
  }
  return arr;
}

// 指令对象的排序
export function utilsSearchInfoSort(searchInfoObj) {
  let searchInfoArr = [];
  for (let key in searchInfoObj) {
    searchInfoArr.push(searchInfoObj[key]);
  }
  searchInfoArr.sort(function (a, b) {
    return b.cnt - a.cnt;
  });
  console.log(searchInfoArr);
  return searchInfoArr;
}

// localStorage存储
export function utilsSetLocalStorage(key, value) {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (error) {
    console.log(error);
  }
}
// localStorage获取
export function utilsGetLocalStorage(key) {
  try {
    let searchInfoObj = localStorage.getItem(key)
      ? JSON.parse(localStorage.getItem(key))
      : {};
    return searchInfoObj;
  } catch (error) {
    console.log(error);
  }
}
// localStorage删除
export function utilsRemoveLocalStorage(key) {
  try {
    localStorage.removeItem(key);
    return utilsGetLocalStorage(key) ? false : true;
  } catch (error) {
    console.error(error);
  }
}
// localStorage清空
export function utilsClearLocalStorage() {
  try {
    localStorage.clear();
    return localStorage.length === 0 ? true : false;
  } catch (error) {
    console.error(error);
  }
}
