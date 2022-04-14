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

export function utilsObjectFrag(originObj, showNum) {
  let cnt = 0,
    newObj = {};
  for (const key in originObj) {
    if (Object.hasOwnProperty.call(originObj, key)) {
      cnt++;
      cnt <= showNum && (newObj[key] = originObj[key]);
    }
  }
  return newObj;
}

export function utilsArrayFrag(
  originArr,
  beginIdx = 0,
  endIdx = originArr.length
) {
  try {
    let newArr = originArr.slice(beginIdx, endIdx);
    return newArr;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export function utilsArrayDel(arr, ele) {
  let eleIndex = arr.indexOf(ele);
  if (eleIndex !== -1) {
    arr.splice(eleIndex, 1);
    return arr;
  }
  return arr;
}

// 历史搜索指令对象的排序与长度限制
export function utilsSortLocalStorage(LSObj, LSObjType) {
  let LSSearchInfoArr = [];
  if (LSObjType === "object") {
    for (let key in LSObj) {
      LSSearchInfoArr.push(LSObj[key]);
    }
    LSSearchInfoArr.sort(function (a, b) {
      return b.cnt - a.cnt;
    });
  } else if (LSObjType === "array") {
    // todo：localstorage对数组的处理
  }
  // 限制长度<=20,对象类型只存20个元素
  if (LSSearchInfoArr.length > 20) {
    LSSearchInfoArr = utilsLimitLocalStorage(LSSearchInfoArr);
  }
  console.log(LSSearchInfoArr);
  return LSSearchInfoArr;
}

// localStorage存储
export function utilsSetLocalStorage(LSkey, LSval) {
  let LSObj = utilsGetLocalStorage(LSkey);
  let LSObjType = checkType(LSObj);
  if (LSObjType === "string") {
    localStorage.setItem(LSkey, LSval);
    return;
  } else if (LSObjType === "array") {
    // todo: localstorage存数组操作
  } else if (LSObjType === "object") {
    // 将proxy对象转换为json字符串再转成普通对象
    let nowObj = JSON.parse(JSON.stringify(LSval));
    let key = nowObj.name;
    LSObj[key]
      ? LSObj[key]["cnt"]++
      : ((LSObj[key] = nowObj), (LSObj[key]["cnt"] = 1));
    let sortedArr = utilsSortLocalStorage(LSObj, LSObjType);
    let newObj = {};
    sortedArr.forEach((item) => {
      newObj[item.name] = item;
    });
    localStorage.setItem(LSkey, JSON.stringify(newObj));
  }
}
// localStorage获取
export function utilsGetLocalStorage(LSkey) {
  try {
    // localStorage中存的是字符串，JSON.parse可以将boolean字符串转成真正的boolean值(即使是false也可以)，数字字符串转成真正的数字
    let recordInfoObj = localStorage.getItem(LSkey);
    try {
      JSON.parse(recordInfoObj);
    } catch (error) {
      // console.log(recordInfoObj);
      return recordInfoObj;
    }
    let parseObj = recordInfoObj ? JSON.parse(recordInfoObj) : {};
    return parseObj;
  } catch (error) {
    console.log(error);
  }
}
// localStorage对象和数组类型长度限制
export function utilsLimitLocalStorage(LSSearchInfoArr) {
  // 截取前10个
  let headInfo = utilsArrayFrag(LSSearchInfoArr, 0, 10);
  // 截取后5个
  let tailInfo = utilsArrayFrag(LSSearchInfoArr, LSSearchInfoArr.length - 5);
  return [...headInfo, ...tailInfo];
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

// 判断数据类型
export function checkType(item) {
  // es6中null的类型为object
  if (item === null) {
    return item + "";
  }
  if (typeof item === "object") {
    let val = Object.prototype.toString.call(item).split(" ")[1];
    let type = val.substr(0, val.length - 1).toLowerCase();
    return type;
  } else {
    return typeof item;
  }
}
