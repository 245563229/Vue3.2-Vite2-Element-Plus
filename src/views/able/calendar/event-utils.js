
let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today
console.log('todayStr',todayStr)
export const INITIAL_EVENTS = [
  {
    id: createEventId(),
    title: 'All-day event',
    start: todayStr
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: todayStr + 'T12:00:00'
  },
  // {
  //   id: createEventId(),
  //   title: '测试1',
  //   start: todayStr + 'T12:00:00',
  //   end:'',
  // },
  {
    id: createEventId(),
    title: '测试2',
    start:  '2024-06-22T05:00:00',
    end:'2024-06-22T12:00:00',

  },
  {
    id: createEventId(),
    title: '测试3',
    start: '2024-06-28T00:00:00',
    // end:'2024-6-28T00:00:00',
    allDay:true
  },
]

export function createEventId() {
  return String(eventGuid++)
}
