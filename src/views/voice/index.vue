<template>
  <el-card class="col-center">
    <div>音频播放器🍲🍲🍲🍲🍲🍲🍲</div>
    <div class="mt10 myVoice">
      <!--      <VideoJs :videoSrc="data.videoSrc" autoPlay />-->
      <button @click="playVio"> 点击播放</button>
    </div>
  </el-card>
</template>

<script setup>
import {onMounted, reactive} from 'vue'
// //找到你的组件地址引入进来
import {initVoice} from '@/utils/voice'

const list = ['恩！支付宝到账100元', '恩！微信到账600圆']
const data = reactive({})



const playVio = () => {
  list.forEach((item)=>{
    initVoice({
      text: item,
      vol: 1,
      rate: 1
    })
  })

}
onMounted(() => {
})
</script>
<style lang="scss" scoped>
.myVoice {
  width: 50vw;
  height: auto;
}
</style>
