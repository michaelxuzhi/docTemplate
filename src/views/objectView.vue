<template>
  <div class="object-content">
    <el-card v-for="(val, key) in resData" :key="key" class="object-card" shadow="hover">
      <div class="object-card-inner">
        <div class="card-img">
          <el-image
            fit="contain"
            :src="require(`../../src/assets/resIcon/${val.img}.png`)"
          />
        </div>

        <div style="padding-top: 14px">
          <el-tag
            class="objTagItemStyle"
            v-for="(v, k) in val"
            :key="k"
            :type="val.type == 'resource' ? 'success' : 'warning'"
            >{{ k + ': ' + v }}</el-tag
          >
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { requestURL } from '@static/data/requestData.js';
export default {
  name: 'objectView',
  data() {
    return {
      resData: {},
    };
  },
  methods: {
    requestResData(url) {
      let that = this;
      this.axios.get(url).then(response => {
        for (const i in response.data) {
          that.resData[i] = response.data[i];
        }
      });
    },
  },
  created() {
    let url = requestURL().resURL;
    this.requestResData(url);
  },
  mounted() {
    // console.log(this.$route.name);
  },
};
</script>

<style scoped>
.object-content {
  width: 60%;
  padding: 60px 60px 60px 80px;
  height: 80%;
  overflow-x: hidden;
  overflow: auto;
}
.object-card {
  float: left;
  width: 40%;
  height: 150px;
  margin: 30px 30px 10px 0;
  background-color: var(--current-object-bg-color);
}
.object-card-inner {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.card-img {
  padding-right: 20px;
}
.objTagItemStyle {
  margin: 0 8px 10px 0;
}
.el-card:hover {
  background-color: #b9b9b9;
}
</style>
