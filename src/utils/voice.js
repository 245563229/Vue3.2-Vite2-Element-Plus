// 执行函数
// initVoice({
//   text: '项目介绍',
//   vol: 1,
//   rate: 1
// })

// 函数
export function initVoice(config) {
  // window.speechSynthesis.cancel();//播报前建议调用取消的函数，如有正在播报的话音，播报会任务被塞进入队列，只有等上一个语音结束才会执行下一个语音
  //获取语音包
  let listArr = window.speechSynthesis.getVoices();
  listArr = listArr.filter(item => item.lang.indexOf('zh-') > -1);
  if (listArr.length == 0) {
    console.error('没有可用的中文语音!');
  }
  //实例化播报内容
  let instance = new SpeechSynthesisUtterance();
  instance.text = config.text || '轻轻敲醒沉睡的心灵，慢慢张开你的眼睛，看看忙碌的世界，是否依然孤独的转个不停！'; // 文字内容
  instance.lang = config.lang || "zh-CN"; // 使用的语言:中文
  instance.volume = config.vol || 1; // 声音音量：1
  instance.rate = config.rate || 1; // 语速：1
  instance.pitch = 1; // 音高：1
  window.speechSynthesis.speak(instance); // 播放
  instance.addEventListener("end", () => {});// 监听播报完成状态，播完可以做些其它处理
}