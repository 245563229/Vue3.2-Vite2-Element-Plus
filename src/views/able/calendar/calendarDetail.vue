<template>
  <div>
    <el-dialog destroy-on-close v-model="divShow" :title="title">
      <el-form :model="state.form">
        <el-form-item label="选定日期" :label-width="formLabelWidth">
      <span v-if="eventInfo.allDay">
        {{dayjs(eventInfo.startStr).format('YYYY-MM-DD HH:mm:ss')}}
      </span>
          <span v-else>
   {{ dayjs(eventInfo.startStr).format('YYYY-MM-DD HH:mm:ss')+ ' ~ '+ dayjs(eventInfo.endStr).format('YYYY-MM-DD HH:mm:ss')}}
          </span>
        </el-form-item>
        <el-form-item label="性质" :label-width="formLabelWidth">
          <el-select v-model="state.form.type" placeholder="请选择性质">
            <el-option label="法定节假日" value="fadingjiejiari"/>
            <el-option label="休息日" value="xiuxiri"/>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="state.form.region" type="textarea" placeholder="请输入备注" clearable />
        </el-form-item>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="confim('cancel')">取消</el-button>
        <el-button type="primary" @click="confim('com')"
        >确定</el-button
        >
       <el-button type="primary" @click="confim('del')"
       >删除</el-button
       >
      </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import {ref, reactive, onMounted, toRefs, watch} from 'vue'
import dayjs from "dayjs";

const props = defineProps({
  divShow: {
    type: Boolean,
    required: true,
  },
  eventInfo: {},
  title:{
    type:String,
    default:'新增'
  }
})
const {divShow,eventInfo,title} = toRefs(props)
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'
const emits = defineEmits(['closeDia'])
const state = reactive({
  form:{
    region: '',
    type: [],
    resource: '',
    desc: '',
  }

})
const confim = (type)=>{
  emits('closeDia',type,state.form)
}
onMounted(() => {
})
watch(
  ()=>eventInfo.value,
  (value)=>{
    console.log('value',value)
})
</script>
<style lang='scss' scoped>
.el-button--text {
  margin-right: 15px;
}

.el-select {
  width: 300px;
}

.el-input {
  width: 300px;
}

.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
