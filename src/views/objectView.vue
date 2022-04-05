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
export default {
  name: 'objectView',
  data() {
    return {
      resData: {},
    };
  },
  methods: {
    requestResData() {
      let that = this;
      this.axios.get('/static/data/resData.json').then(response => {
        for (const i in response.data) {
          that.resData[i] = response.data[i];
        }
        console.log(that.resData);
      });
    },
  },
  created() {
    this.requestResData();
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
  background-color: #fbfbfb;
}
</style>
