// 时钟功能
function updateClock() {
    const now = new Date();
    
    // 更新日期
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const weekdays = ['日', '一', '二', '三', '四', '五', '六'];
    const weekday = weekdays[now.getDay()];
    document.querySelector('.date').textContent = `${year}年${month}月${day}日 星期${weekday}`;
    
    // 直接更新时间，不使用翻页效果
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    document.querySelector('.time').textContent = `${hours}:${minutes}:${seconds}`;
}

// 立即更新一次
updateClock();

// 每秒更新一次
setInterval(updateClock, 1000); 