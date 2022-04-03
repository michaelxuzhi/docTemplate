<template>
  <div class="show-content">
    <!-- {{ atInfo1 }} -->
    <el-button
      color="#4149e0"
      :size="size"
      :type="type"
      round
      plain
      class="at-btn"
      @click="handleClick(val, key)"
      v-for="(val, key) in atInfoShow"
      :key="key"
      >{{ val.desc ? val.desc : key }}</el-button
    >
    <el-backtop target=".show-content" :visibility-height="20"></el-backtop>
  </div>
</template>
<script>
export default {
  name: 'PageShow',
  data() {
    return {
      size: 'default',
      type: 'primary',
    };
  },
  props: {
    data1: {
      return: {
        type: String,
        default: '',
      },
    },
    atInfo: {
      return: {
        type: Object,
        default: {},
      },
    },
  },
  methods: {
    handleClick(val, key) {
      this.$router.push({
        name: 'at',
        params: { key: key, val: JSON.stringify(val) },
      });
    },
  },

  created() {
    // console.log('PageShow created', this.atInfo);
    // this.requestJSON();
  },
  mounted() {
    // this.requestJSON();
  },
  computed: {
    atInfoShow() {
      let keyItem = {};
      for (let val of Object.values(this.atInfo)) {
        keyItem[val.name] = val;
      }
      return keyItem;
    },
  },
};
</script>

<style scoped>
.show-content {
  width: 70%;
  padding: 60px;
  height: 80%;
  overflow-x: hidden;
  /* background-color: rgb(172, 172, 172); */
  /* background-color: #4149e0; */
}
.at-btn {
  padding: 15px;
  margin: 10px;
  font-size: 16px;
}
/* .at-btn > span {
  height: 20px;
} */
</style>
