<template>
  <div>
    <PageContainer />
  </div>
</template>

<script>
import PageContainer from './components/PageContainer.vue';

export default {
  name: 'App',
  components: {
    PageContainer,
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: rgb(145, 145, 145); /* 背景色，开发的时候不那么刺眼 */
}
</style>
