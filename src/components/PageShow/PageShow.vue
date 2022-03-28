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
      v-for="item in atInfo1"
      :key="item"
      @click="toPageAt"
      >{{ item }}</el-button
    >
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
    toPageAt() {
      console.log('toPageAt');
      //通过push进行跳转
      this.$router.push('/at');
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
    atInfo1: function () {
      let keyItem = {};
      for (let item in this.atInfo) {
        if (this.atInfo[item]['desc'] == '') {
          keyItem[this.atInfo[item]['name']] = this.atInfo[item]['name'];
        } else {
          keyItem[this.atInfo[item]['name']] = this.atInfo[item]['desc'];
        }
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
