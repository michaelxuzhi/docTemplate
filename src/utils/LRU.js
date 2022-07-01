// LRU算法
class LRUCache{
  constructor(length){
    this.length = length;
    this.data = new Map()
  }
  // 存储数据，通过键值对的方式
  set(key,value){
    console.log(key,value);
    const data = this.data;
    if(data.has(key)){
      data.delete(key);
    }
    data.set(key,value);
    if(data.size > this.length){
      const delKey = data.keys().next().value;
      data.delete(delKey);
    }
  }
  // 获取数据
  get(key){
    console.log(key);
    const data = this.data;
      // 未找到
      if (!data.has(key)) {
        return null;
      }
      const value = data.get(key); // 获取元素
      data.delete(key); // 删除元素
      data.set(key, value); // 重新插入元素
    }
}

// const LRUCacheRecord = new LRUCache(5);
module.exports =  LRUCache;