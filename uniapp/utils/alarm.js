// 闹钟工具函数
export function checkAlarm(alarms) {
  const now = new Date()
  const currentTime = now.getHours().toString().padStart(2, '0') + ':' + 
                     now.getMinutes().toString().padStart(2, '0')
  const currentDay = now.getDay()
  const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']

  alarms.forEach(alarm => {
    if (alarm.time === currentTime && 
        (alarm.days === '每天' || alarm.days.includes(weekdays[currentDay]))) {
      triggerAlarm(alarm)
    }
  })
}

export function triggerAlarm(alarm) {
  // 播放提示音
  const innerAudioContext = uni.createInnerAudioContext()
  innerAudioContext.src = '/static/alarm.mp3'
  innerAudioContext.play()
  
  // 显示提示
  uni.showModal({
    title: '闹钟提醒',
    content: `现在是 ${alarm.time}`,
    showCancel: false
  })
}

export function formatTime(date) {
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  return `${hours}:${minutes}`
}

export function parseTime(timeString) {
  const [hours, minutes] = timeString.split(':').map(Number)
  const date = new Date()
  date.setHours(hours)
  date.setMinutes(minutes)
  return date
}

export function getDayName(index) {
  const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
  return weekdays[index]
}

export function formatDays(days) {
  if (!days || days.length === 0) return '每天'
  return days.map(day => getDayName(day)).join(' ')
} 