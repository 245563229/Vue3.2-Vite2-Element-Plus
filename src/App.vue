<template>
  <router-view v-if="isRouterAlive"></router-view>
</template>

<script setup>
import { onMounted, ref, nextTick, provide } from "vue";
import city from "./mock/ningboCity";
import { useStore } from "vuex";
// 局部组件刷新
const isRouterAlive = ref(true);
const globalStore = useStore();
const reload = () => {
  isRouterAlive.value = false;
  nextTick(() => {
    isRouterAlive.value = true;
    console.log("数据刷新成功");
  });
};
provide("reload", reload);
onMounted(() => {
  globalStore.dispatch("user/changeThem", "#4060c7");
  console.log("city", city);
  // city.features.forEach((element) => {
  //   element.geometry.coordinates.forEach((item) => {
  //     // console.log("item", item);
  //     item.forEach((ele) => {
  //       ele.forEach((pr) => {
  //         console.log("ele ", pr);
  //         pr = pr.reverse();
  //         console.log("ele格式之后 ", pr);
  //       });
  //     });
  //   });
  // });
  console.log("city", city);
});
</script>

<style scoped lang="scss"></style>
