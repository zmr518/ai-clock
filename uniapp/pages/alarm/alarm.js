Page({
  data: {
    alarms: [],
    showEditForm: false,
    editTime: '00:00',
    selectedDays: [],
    editingIndex: -1,
    weekdays: ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
  },
  onLoad: function() {
    this.loadAlarms()
    this.startAlarmCheck()
  },
  onUnload: function() {
    this.stopAlarmCheck()
  },
  loadAlarms: function() {
    const alarms = wx.getStorageSync('alarms') || []
    this.setData({ alarms })
  },
  saveAlarms: function() {
    wx.setStorageSync('alarms', this.data.alarms)
  },
  showAddAlarm: function() {
    this.setData({
      editingIndex: -1,
      editTime: '00:00',
      selectedDays: [],
      showEditForm: true
    })
  },
  hideEditForm: function() {
    this.setData({ showEditForm: false })
  },
  onTimeChange: function(e) {
    this.setData({ editTime: e.detail.value })
  },
  toggleDay: function(e) {
    const index = e.currentTarget.dataset.index
    const selectedDays = [...this.data.selectedDays]
    const i = selectedDays.indexOf(index)
    
    if (i > -1) {
      selectedDays.splice(i, 1)
    } else {
      selectedDays.push(index)
    }
    
    this.setData({ selectedDays })
  },
  saveAlarm: function() {
    const days = this.data.selectedDays
      .sort((a, b) => a - b)
      .map(i => this.data.weekdays[i])
      .join(' ')
    
    const alarm = {
      time: this.data.editTime,
      days: days || '每天',
      enabled: true
    }
    
    const alarms = [...this.data.alarms]
    if (this.data.editingIndex > -1) {
      alarms[this.data.editingIndex] = alarm
    } else {
      alarms.push(alarm)
    }
    
    this.setData({ alarms })
    this.saveAlarms()
    this.hideEditForm()
  },
  editAlarm: function(e) {
    const index = e.currentTarget.dataset.index
    const alarm = this.data.alarms[index]
    const selectedDays = alarm.days.split(' ')
      .map(day => this.data.weekdays.indexOf(day))
      .filter(i => i > -1)
    
    this.setData({
      editingIndex: index,
      editTime: alarm.time,
      selectedDays,
      showEditForm: true
    })
  },
  deleteAlarm: function(e) {
    const index = e.currentTarget.dataset.index
    wx.showModal({
      title: '确认删除',
      content: '确定要删除这个闹钟吗？',
      success: (res) => {
        if (res.confirm) {
          const alarms = [...this.data.alarms]
          alarms.splice(index, 1)
          this.setData({ alarms })
          this.saveAlarms()
        }
      }
    })
  },
  toggleAlarm: function(e) {
    const index = e.currentTarget.dataset.index;
    const alarms = this.data.alarms;
    alarms[index].enabled = !alarms[index].enabled;
    
    this.setData({
      alarms: alarms
    });
    
    // 保存到本地存储
    wx.setStorageSync('alarms', alarms);
  },
  startAlarmCheck: function() {
    this.alarmInterval = setInterval(() => {
      this.checkAlarm()
    }, 1000)
  },
  stopAlarmCheck: function() {
    if (this.alarmInterval) {
      clearInterval(this.alarmInterval)
    }
  },
  checkAlarm: function() {
    const now = new Date()
    const currentTime = now.getHours().toString().padStart(2, '0') + ':' + 
                       now.getMinutes().toString().padStart(2, '0')
    const currentDay = this.data.weekdays[now.getDay()]
    
    this.data.alarms.forEach(alarm => {
      if (alarm.enabled && alarm.time === currentTime && 
          (alarm.days === '每天' || alarm.days.includes(currentDay))) {
        this.triggerAlarm(alarm)
      }
    })
  },
  triggerAlarm: function(alarm) {
    // 播放提示音
    const innerAudioContext = wx.createInnerAudioContext({
      useWebAudioImplement: true
    })
    innerAudioContext.src = 'static/alarm.mp3'
    innerAudioContext.play()
    
    // 显示提示
    wx.showModal({
      title: '闹钟提醒',
      content: `现在是 ${alarm.time}`,
      showCancel: false
    })
  }
}) 