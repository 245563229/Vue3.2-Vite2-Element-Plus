<template>
  <div class='demo-app'>
    <div class='demo-app-sidebar'>
      <div class='demo-app-sidebar-section'>
        <h2>说明</h2>
        <button @click="ceshiBtn">
          测
        </button>
        <ul>
          <li>选择日期，系统将提示您创建新事件</li>
          <li>拖放和调整事件大小</li>
          <li>单击事件以将其删除</li>
        </ul>
      </div>
      <div class='demo-app-sidebar-section'>
        <label>
          <input
            type='checkbox'
            :checked='calendarOptions.weekends'
            @change='handleWeekendsToggle'
          />
          切换周末
        </label>
      </div>
      <div class='demo-app-sidebar-section'>
        <h2>所有事件 ({{ currentEvents.length }})</h2>
        <ul>
          <li v-for='event in currentEvents' :key='event.id'>
            <b>{{ event.startStr }}</b>
            <i>{{ event.title }}</i>
          </li>
        </ul>
      </div>
    </div>
    <div class='demo-app-main'>
      <FullCalendar
        class='demo-app-calendar'
        :options='calendarOptions'
      >
        <template v-slot:eventContent='arg'>
          <div>cccc</div>
          <div>5555</div>
          <!--          <b>{{ arg.timeText }}</b>-->
          <!--          <i>{{ arg.event.title }}</i>-->
        </template>
      </FullCalendar>
    </div>
    <calendar-detail
      :divShow="state.divShow"
      :eventInfo="state.eventInfo"
      @closeDia="closeDia"
    >

    </calendar-detail>
  </div>
</template>

<script setup>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import {INITIAL_EVENTS, createEventId} from './event-utils'
import {nextTick, onMounted, reactive, ref} from "vue"
import CalendarDetail from "@/views/able/calendar/calendarDetail.vue";

const state = reactive({
  mouseInfo: {
    left: '',
    top: '',
  },
  eventInfo: '',
  divShow: false,
})
const calendarOptions = reactive({
  plugins: [
    dayGridPlugin,
    timeGridPlugin,
    interactionPlugin // needed for dateClick
  ],
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay'
  },
  // 翻译
  buttonText: {
    today: '今天',
    month: '月',
    week: '周',
    day: '日',
    list: 'list',
    june: '6月'
  },
  // 标题区间符号
  titleRangeSeparator: '至',
  // 视图
  views: {
    // 周
    resourceTimelineWeek: {
      type: 'resourceTimeline',
      // 间隔一周
      duration: {weeks: 1},
      // 时隙一整天
      slotDuration: {day: 1},
      // 周日期格式
      slotLabelFormat: [
        {weekday: 'long', day: 'numeric', month: 'short'}
      ],
      // 事件最多显示3个，其余在更多里
      eventMaxStack: 3,
    },
    // 日
    resourceTimelineDay: {
      type: 'resourceTimeline',
      slotDuration: '00:30:00',
      eventMaxStack: 3,
      slotLabelInterval: '00:30',
    },
    moreLinkText: '更多'
  },
  initialView: 'dayGridMonth',
  // 数据源
  initialEvents: INITIAL_EVENTS,
  // 可推拽
  editable: true,
  // 可选择的
  selectable: true,
  // 鼠标悬停事件
  eventMouseEnter(info) {
    state.mouseInfo.left = info.jsEvent.pageX - 500 + 'px';
    state.mouseInfo.top = info.jsEvent.pageY - 100 + 'px';
    state.eventInfo = info.event._def.extendedProps.info;
    // state.divShow = true;
  },
  //鼠标离开
  eventMouseLeave() {
    // state.divShow = false;
  },
  // 语言
  locale: 'zh-cn',
  selectMirror: true,
  dayMaxEvents: true,
  weekends: true,
})

const currentEvents = ref([])

const handleWeekendsToggle = () => {
  calendarOptions.weekends = !calendarOptions.weekends
}
// 弹窗关闭
const closeDia = (type, form) => {
  console.log('form', form)
  if (type === 'del') {
    state.divShow = false
    nextTick(() => {
      state.eventInfo.event.remove()
    })
  } else if (type === 'cancel') {
    state.divShow = false
  } else if (type === 'com') {
    state.divShow = false
    const calendarApi = state.eventInfo.view.calendar
    calendarApi.unselect()
      calendarApi.addEvent({
       ...state.eventInfo,...form
      })
  }
}
const handleDateSelect = (selectInfo) => {
  state.eventInfo = selectInfo
  state.divShow = true

  // let title = prompt('请输入一个新的事件')
  // let calendarApi = selectInfo.view.calendar
  return
  // calendarApi.unselect()
  // if (title) {
  //   calendarApi.addEvent({
  //     id: createEventId(),
  //     title,
  //     start: selectInfo.startStr,
  //     end: selectInfo.endStr,
  //     allDay: selectInfo.allDay
  //   })
  // }
}

const handleEventClick = (clickInfo) => {
  state.eventInfo = clickInfo
  state.divShow = true
  // if (confirm(`确定删除事件 '${clickInfo.event.title}'`)) {
  //   clickInfo.event.remove()
  // }
}

const handleEvents = (events) => {
  currentEvents.value = events
}
const ceshiBtn = () => {
  console.log('currentEvents', currentEvents.value)
}
calendarOptions.select = handleDateSelect
calendarOptions.eventClick = handleEventClick
calendarOptions.eventsSet = handleEvents
onMounted(() => {
  // Additional logic if needed
})
</script>

<style lang='css' scoped>
h2 {
  margin: 0;
  font-size: 16px;
}

ul {
  margin: 0;
  padding: 0 0 0 1.5em;
}

li {
  margin: 1.5em 0;
  padding: 0;
}

b { /* used for event dates/times */
  margin-right: 3px;
}

.demo-app {
  display: flex;
  min-height: 100%;
  font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
  font-size: 14px;
}

.demo-app-sidebar {
  width: 300px;
  line-height: 1.5;
  background: #eaf9ff;
  border-right: 1px solid #d3e2e8;
}

.demo-app-sidebar-section {
  padding: 2em;
}

.demo-app-main {
  flex-grow: 1;
  padding: 3em;
}

.fc { /* the calendar root */
  max-width: 1100px;
  margin: 0 auto;
}
</style>
