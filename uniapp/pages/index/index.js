Page({
  data: {
    time: '00:00:00',
    date: ''
  },
  onLoad: function() {
    this.updateTime()
    this.interval = setInterval(() => {
      this.updateTime()
    }, 1000)
  },
  onUnload: function() {
    if (this.interval) {
      clearInterval(this.interval)
    }
  },
  updateTime: function() {
    const now = new Date()
    this.setData({
      time: now.toLocaleTimeString('zh-CN', { hour12: false }),
      date: now.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long'
      })
    })
  }
}) 